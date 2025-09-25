import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ImageViewerPage = () => {
  const { studyUID, seriesUID } = useParams();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://dicom-fastapi.fly.dev/get_image_urls/${studyUID}/${seriesUID}`;

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImageUrls(data.image_urls || []);
      } catch (error) {
        console.error("Failed to load image URLs:", error);
        setImageUrls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, [studyUID, seriesUID, url]);

  const handlePrint = () => {
    window.print();
  };
  console.log(imageUrls);
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div className="no-print" style={styles.header}>
          <h2 style={styles.title}>Medical Images</h2>
          <p style={styles.subtitle}>DICOM images for this study</p>
        </div>

        {loading ? (
          <div className="no-print" style={styles.loadingContainer}>
            <div style={styles.loadingIcon}>⏳</div>
            <h3 style={styles.loadingTitle}>Loading Images</h3>
            <p style={styles.loadingText}>Please wait while we fetch the medical images...</p>
          </div>
        ) : imageUrls.length > 0 ? (
          <div style={styles.imageGrid}>
            {imageUrls.map((url, index) => (
              <div key={index} style={styles.imageContainer}>
                <img
                  src={url}
                  alt={`DICOM ${index + 1}`}
                  style={styles.image}
                  className="print-image"
                />
                <div className="no-print" style={styles.imageLabel}>
                  Image {index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-print" style={styles.emptyContainer}>
            <div style={styles.emptyIcon}>📷</div>
            <h3 style={styles.emptyTitle}>No Images Found</h3>
            <p style={styles.emptyText}>No medical images are available for this study.</p>
          </div>
        )}

        <div className="no-print" style={styles.buttons}>
          <button onClick={handlePrint} style={styles.primaryButton}>
            🖨️ Print Images
          </button>
          <button onClick={() => navigate(-1)} style={styles.secondaryButton}>
            ⬅️ Back to Report
          </button>
        </div>

        <style>
          {`
            @media print {
              .no-print {
                display: none !important;
              }
              img.print-image {
                page-break-inside: avoid;
                break-inside: avoid;
                max-width: 100%;
                margin: 20px 0;
                border: none;
                border-radius: 0;
              }
              body {
                margin: 0;
                padding: 0;
                background: white;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f8f9fa',
    padding: '20px',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    overflow: 'hidden',
  },
  header: {
    padding: '30px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
  },
  loadingContainer: {
    padding: '40px',
    textAlign: 'center',
  },
  loadingIcon: {
    fontSize: '2rem',
    marginBottom: '15px',
  },
  loadingTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  loadingText: {
    color: '#666',
    fontSize: '0.9rem',
  },
  emptyContainer: {
    padding: '40px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '2rem',
    marginBottom: '15px',
  },
  emptyTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  emptyText: {
    color: '#666',
    fontSize: '0.9rem',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px',
    padding: '20px',
  },
  imageContainer: {
    background: 'white',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    backgroundColor: '#f8f9fa',
    display: 'block',
  },
  imageLabel: {
    padding: '10px',
    background: '#f8f9fa',
    borderTop: '1px solid #ddd',
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
  },
  buttons: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  secondaryButton: {
    background: '#f8f9fa',
    color: '#333',
    border: '1px solid #ddd',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default ImageViewerPage;
