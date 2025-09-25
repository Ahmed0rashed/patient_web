import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ReportDetails from '../components/ReportDetails';

const RecordPage = () => {
  const { recordId } = useParams();
  const { isAuthenticated } = useAuth();
  const [recordData, setRecordData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [centerData, setCenterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://graduation-project-mmih.vercel.app/api/Record/getOneRecordById/${recordId}`);
        if (!res.ok) throw new Error('faild loding Record');
        const record = await res.json();
        setRecordData(record);

        if (record.status === 'Completed') {
          const reportRes = await fetch(`https://graduation-project-mmih.vercel.app/api/AIReports/getOneAIReport/${record.reportId}`);
          if (!reportRes.ok) throw new Error('faild loding Report');
          const report = await reportRes.json();
          setReportData(report);
          const centerRes = await fetch(`https://graduation-project-mmih.vercel.app/api/centers/getCenterById/${record.centerId}`);
          if (!centerRes.ok) throw new Error('faild loding Center');
          const center = await centerRes.json();
          setCenterData(center);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (recordId) {
      fetchData();
    }
  }, [recordId]);


  if (loading) {
    return (
      <div style={styles.loadingCard}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
        <h3 style={{ marginBottom: '10px', color: '#374151' }}>Loading Report...</h3>
        <p style={{ color: '#6b7280' }}>Please wait while we fetch your medical report</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorCard}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⚠️</div>
        <h3 style={{ marginBottom: '10px', color: '#ef4444' }}>Error Loading Report</h3>
        <p style={{ color: '#6b7280' }}>{error}</p>
      </div>
    );
  }

  if (recordData.status !== 'Completed') {
    return (
      <div style={styles.notReadyCard}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>📄</div>
        <h3 style={{ marginBottom: '10px', color: '#374151' }}>Report Not Ready</h3>
        <p style={{ color: '#6b7280' }}>The report is not ready now, please come back later.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Add Record to Patient Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <div style={styles.addRecordSection}>
          <div style={styles.addRecordCard}>
            <h3 style={styles.addRecordTitle}>Save This Report</h3>
            <p style={styles.addRecordDescription}>
              Sign in to add this medical report to your personal records for easy access.
            </p>
            <div style={styles.authButtons}>
              <a href={`/#/login?recordId=${recordId}&redirect=/showReport/${recordId}`} style={styles.authButton}>
                Sign In
              </a>
              <a href={`/#/register?recordId=${recordId}&redirect=/showReport/${recordId}`} style={styles.authButtonPrimary}>
                Create Account
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Report Details */}
      <ReportDetails record={recordData} report={reportData} center={centerData} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  addRecordSection: {
    marginBottom: '32px',
  },
  addRecordCard: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    border: '1px solid #bae6fd',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  addRecordTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '8px',
  },
  addRecordDescription: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '16px',
  },
  authButton: {
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    border: '1px solid #d1d5db',
  },
  authButtonPrimary: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
  },
  loadingCard: {
    width: '100%',
    maxWidth: '500px',
    background: 'white',
    padding: '48px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    margin: '40px auto',
  },
  errorCard: {
    width: '100%',
    maxWidth: '500px',
    background: 'white',
    padding: '48px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    color: '#dc2626',
    margin: '40px auto',
  },
  notReadyCard: {
    width: '100%',
    maxWidth: '500px',
    background: 'white',
    padding: '48px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    color: '#64748b',
    margin: '40px auto',
  },
};

export default RecordPage;
