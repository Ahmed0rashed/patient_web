import React, { useRef, useState } from 'react';
import DownloadPdfButton from './DownloadPdfButton'; // Import the DownloadPdfButton component
import { explainReport } from '../services/geminiService';
import './ReportDetails.css';

const ReportDetails = ({ record, report, center }) => {
  const reportRef = useRef(); // Create a ref for the report content
  const [explanation, setExplanation] = useState(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [explanationError, setExplanationError] = useState(null);

  const handleExplainReport = async () => {
    setIsLoadingExplanation(true);
    setExplanationError(null);
    
    try {
      const findings = report?.diagnosisReportFinding || '';
      const impression = report?.diagnosisReportImpration || '';
      
      const result = await explainReport(findings, impression);
      setExplanation(result);
    } catch (error) {
      setExplanationError(error.message);
      console.error('Error getting explanation:', error);
    } finally {
      setIsLoadingExplanation(false);
    }
  };
  return (
    <div ref={reportRef} style={styles.container} className="report-container">
      <h2 style={styles.title} className="report-title">{center?.data?.centerName || 'No Center Name'}</h2>

      <div style={styles.row} className="report-row">
        <div style={styles.item} className="report-item">
          <strong>Patient Name:</strong> {record.patient_name || 'N/A'}
        </div>
        <div style={styles.item} className="report-item">
          <strong>Age:</strong> {record.age || 'N/A'}
        </div>

      </div>
      <div style={styles.row} className="report-row">
        <div style={styles.item} className="report-item">
          <strong>Gender:</strong> {record.sex || 'N/A'}
        </div>
        <div style={styles.item} className="report-item">
          <strong>Report Status:</strong> {report?.result || 'N/A'}
        </div>
      </div>
      <div style={styles.row} className="report-row">
        <div style={styles.item} className="report-item">
          <strong>Created At:</strong>{' '}
          {report?.createdAt
            ? new Date(report.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
            : 'N/A'}
        </div>
        <div style={styles.item} className="report-item">
          <strong>Body Part:</strong> {record.body_part_examined || 'N/A'}
        </div>
      </div>

      <div style={styles.section} className="report-section">
        <strong>Findings:</strong>
        <p>{report?.diagnosisReportFinding || 'No findings yet.'}</p>
      </div>

      <div style={styles.section} className="report-section">
        <strong>Impression:</strong>
        <p>{report?.diagnosisReportImpration || 'No impression yet.'}</p>
      </div>

      <div style={styles.section} className="report-section">
        <strong>Comment:</strong>
        <p>{report?.diagnosisReportComment || 'No comments yet.'}</p>
      </div>

      {/* AI Explanation Section */}
      <div style={styles.section} className="report-section">
        <div style={styles.explanationHeader} className="report-explanation-header">
          <strong>AI Explanation:</strong>
          <button 
            onClick={handleExplainReport}
            disabled={isLoadingExplanation}
            style={{
              ...styles.explainButton,
              ...(isLoadingExplanation ? styles.explainButtonDisabled : {})
            }}
            className="report-explain-button"
          >
            {isLoadingExplanation ? 'Generating...' : 'Explain Report'}
          </button>
        </div>
        
        {explanationError && (
          <div style={styles.errorMessage} className="report-error-message">
            Error: {explanationError}
          </div>
        )}
        
        {explanation && (
          <div style={styles.explanationContent} className="report-explanation-content">
            <div style={styles.explanationText} className="report-explanation-text">
              <strong>Patient Explanation:</strong>
              <p style={styles.explanationTextParagraph}>{explanation.patient_explanation}</p>
            </div>
            <div style={styles.explanationMeta} className="report-explanation-meta">
              <small>
                Language: {explanation.language} | 
                Generated: {new Date(explanation.timestamp).toLocaleString()}
              </small>
            </div>
            <div style={styles.disclaimer} className="report-disclaimer">
              <small>{explanation.disclaimer}</small>
            </div>
          </div>
        )}
      </div>

      {/* Add the Download PDF button */}
      <DownloadPdfButton
        record={record}
        targetRef={reportRef}
        fileName="diagnosis_report.pdf"
      />

    </div>

  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      padding: '20px',
      gap: '20px',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
      gap: '16px',
    },
  },
  title: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '32px',
    color: '#1e293b',
    fontWeight: '700',
    letterSpacing: '-0.025em',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
      marginBottom: '24px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem',
      marginBottom: '20px',
    },
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '16px',
    },
  },
  item: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '16px',
      fontSize: '14px',
    },
    '@media (max-width: 480px)': {
      padding: '14px',
      fontSize: '13px',
    },
  },
  section: {
    background: 'white',
    padding: '28px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '20px',
      fontSize: '14px',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
      fontSize: '13px',
    },
  },
  explanationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
    },
  },
  explainButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '@media (max-width: 768px)': {
      width: '100%',
      padding: '14px 20px',
      fontSize: '16px',
      minHeight: '48px',
      justifyContent: 'center',
    },
  },
  explainButtonDisabled: {
    background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  errorMessage: {
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: '500',
  },
  explanationContent: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #bae6fd',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      padding: '20px',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
    },
  },
  explanationText: {
    marginBottom: '20px',
  },
  explanationTextParagraph: {
    margin: '12px 0',
    lineHeight: '1.7',
    fontSize: '16px',
    color: '#1e293b',
    fontWeight: '400',
    '@media (max-width: 768px)': {
      fontSize: '15px',
      lineHeight: '1.6',
    },
    '@media (max-width: 480px)': {
      fontSize: '14px',
      lineHeight: '1.5',
    },
  },
  explanationMeta: {
    color: '#64748b',
    marginBottom: '16px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  disclaimer: {
    color: '#64748b',
    fontStyle: 'italic',
    fontSize: '13px',
    padding: '16px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    lineHeight: '1.5',
    '@media (max-width: 768px)': {
      padding: '12px',
      fontSize: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '10px',
      fontSize: '11px',
    },
  },
};

export default ReportDetails;
