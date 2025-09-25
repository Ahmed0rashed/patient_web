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
         Download PDF
      </button>
      <button
        id="image-button"
        onClick={() =>
          navigate(`/image-viewer/${record?.Study_Instance_UID}/${record?.Series_Instance_UID}`)
        }
        style={styles.secondaryButton}
      >
        Show Images
      </button>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '32px',
    gap: '16px',
    flexWrap: 'wrap'
  },
  button: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    minWidth: '180px',

    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    '&:hover': {
      transform: 'translateY(-2px)',

    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover:before': {
      left: '100%',
    }
  },
  secondaryButton: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    minWidth: '180px',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3), 0 1px 0 rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4), 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover:before': {
      left: '100%',
    }
  }
};

export default DownloadPdfButton;
