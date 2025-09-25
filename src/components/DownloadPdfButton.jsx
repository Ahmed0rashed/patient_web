import React from 'react';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';

const DownloadPdfButton = ({ record, targetRef, fileName = 'report.pdf', style }) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const element = targetRef.current;
    const button = document.getElementById('download-button');
    const button0 = document.getElementById('image-button');

    if (button) button.style.display = 'none';
    if (button0) button0.style.display = 'none';

    const opt = {
      margin: 0.5,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        if (button) button.style.display = 'inline-block';
        if (button0) button0.style.display = 'inline-block';
      })
      .catch(() => {
        if (button) button.style.display = 'inline-block';
        if (button0) button0.style.display = 'inline-block';
      });
  };

  return (
    <div style={styles.buttonContainer}>
      <button
        id="download-button"
        onClick={handleDownload}
        style={{ ...styles.button, ...style }}
      >
        📄 Download PDF
      </button>
      <button
        id="image-button"
        onClick={() =>
          navigate(`/image-viewer/${record?.Study_Instance_UID}/${record?.Series_Instance_UID}`)
        }
        style={styles.secondaryButton}
      >
        🩻 View X-Ray Images
      </button>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    gap: '12px'
  },
  button: {
    padding: '10px 24px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '200px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s'
  },
  secondaryButton: {
    padding: '10px 24px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '200px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s'
  }
};

export default DownloadPdfButton;
