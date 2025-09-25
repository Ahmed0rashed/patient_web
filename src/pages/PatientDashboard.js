import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getPatientRecords } from '../services/patientRecordService';
import { Link } from 'react-router-dom';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('PatientDashboard - isAuthenticated:', isAuthenticated);
  console.log('PatientDashboard - user:', user);
  console.log('PatientDashboard - authLoading:', authLoading);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    const fetchPatientRecords = async () => {
      console.log('Auth check - isAuthenticated:', isAuthenticated);
      console.log('Auth check - user:', user);
      console.log('Auth check - user._id:', user?._id);
      console.log('Auth check - user.id:', user?.id);
      
      if (!isAuthenticated || (!user?._id && !user?.id)) {
        setError('Please log in to view your records');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Try both _id and id fields
        const userId = user?._id || user?.id;
        console.log('Using userId:', userId);
        console.log('Fetching records for user:', user);
        const response = await getPatientRecords(userId);
        console.log('Patient records response:', response);
        setRecords(response.records || []);
      } catch (err) {
        console.error('Error fetching patient records:', err);
        setError(err.message || 'Failed to load your records');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecords();
  }, [isAuthenticated, user, authLoading]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#059669';
      case 'In Progress':
        return '#d97706';
      case 'Pending':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return '✅';
      case 'In Progress':
        return '⏳';
      case 'Pending':
        return '📋';
      default:
        return '📄';
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
          <h2 style={styles.errorTitle}>Access Denied</h2>
          <p style={styles.errorMessage}>Please log in to view your medical records.</p>
          <Link to="/login" style={styles.loginButton}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (authLoading || loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingCard}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
          <h3 style={{ marginBottom: '10px', color: '#374151' }}>
            {authLoading ? 'Checking Authentication...' : 'Loading Your Records...'}
          </h3>
          <p style={{ color: '#6b7280' }}>
            {authLoading ? 'Please wait while we verify your login' : 'Please wait while we fetch your medical records'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⚠️</div>
          <h3 style={{ marginBottom: '10px', color: '#ef4444' }}>Error Loading Records</h3>
          <p style={{ color: '#6b7280' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Medical Records</h1>
        <p style={styles.subtitle}>
          Welcome back, {user?.firstName}! Here are your medical reports and records.
        </p>
      </div>

      {records.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📋</div>
          <h3 style={styles.emptyTitle}>No Records Found</h3>
          <p style={styles.emptyMessage}>
            You don't have any medical records yet. Records will appear here once they are added to your account.
          </p>
        </div>
      ) : (
        <div className="records-grid">
          {records.map((record) => (
            <div key={record._id} style={styles.recordCard}>
              <div style={styles.recordHeader}>
                <div style={styles.recordInfo}>
                  <h3 style={styles.recordTitle}>
                    {record.body_part_examined ? 
                      `${record.body_part_examined.charAt(0).toUpperCase() + record.body_part_examined.slice(1)} Examination` : 
                      'Medical Report'
                    }
                  </h3>
                  <p style={styles.recordDate}>
                    {formatDate(record.createdAt)}
                  </p>
                </div>
                <div style={{
                  ...styles.statusBadge,
                  backgroundColor: getStatusColor(record.status) + '20',
                  color: getStatusColor(record.status),
                  borderColor: getStatusColor(record.status) + '40'
                }}>
                  <span style={styles.statusIcon}>{getStatusIcon(record.status)}</span>
                  {record.status}
                </div>
              </div>

              <div style={styles.recordDetails}>
                <div className="patient-info-mobile">
                  <div className="patient-detail-mobile">
                    <span className="detail-label">Patient ID</span>
                    <span className="detail-value">{record.patient_id}</span>
                  </div>
                  <div className="patient-detail-mobile">
                    <span className="detail-label">Modality</span>
                    <span className="detail-value">{record.modality}</span>
                  </div>
                  <div className="patient-detail-mobile">
                    <span className="detail-label">Age</span>
                    <span className="detail-value">{record.age} years</span>
                  </div>
                  {record.specializationRequest && (
                    <div className="patient-detail-mobile">
                      <span className="detail-label">Specialization</span>
                      <span className="detail-value">{record.specializationRequest}</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.recordActions} className="patient-actions-mobile">
                {record.status === 'Completed' ? (
                  <Link 
                    to={`/showReport/${record._id}`} 
                    style={styles.viewButton}
                    className="view-button"
                  >
                    View Report
                  </Link>
                ) : (
                  <div style={styles.pendingButton}>
                    Report Not Ready
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    minHeight: 'calc(100vh - 200px)',
    '@media (max-width: 768px)': {
      padding: '16px',
    },
    '@media (max-width: 480px)': {
      padding: '12px',
    },
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem',
    },
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
  },
  recordCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      padding: '20px',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
    },
  },
  recordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '16px',
    },
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '8px',
    lineHeight: '1.4',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
      marginBottom: '6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  recordDate: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '13px',
    },
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid',
    '@media (max-width: 768px)': {
      alignSelf: 'flex-start',
      padding: '8px 14px',
      fontSize: '13px',
    },
  },
  statusIcon: {
    fontSize: '14px',
  },
  recordDetails: {
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      marginBottom: '16px',
    },
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  detailLabel: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '14px',
    color: '#1e293b',
    fontWeight: '600',
  },
  recordActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  viewButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
    '@media (max-width: 768px)': {
      padding: '12px 16px',
      fontSize: '16px',
      width: '100%',
      textAlign: 'center',
      display: 'block',
    },
  },
  pendingButton: {
    background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'not-allowed',
    '@media (max-width: 768px)': {
      padding: '12px 16px',
      fontSize: '16px',
      width: '100%',
      textAlign: 'center',
    },
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
    margin: '40px auto',
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: '12px',
  },
  errorMessage: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '24px',
    lineHeight: '1.6',
  },
  loginButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
  },
  retryButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px',
  },
  emptyMessage: {
    fontSize: '1rem',
    color: '#6b7280',
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto',
  },
};

export default PatientDashboard;
