import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActionPage = ({ actionType }) => {
  const { recordId } = useParams();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const performAction = async () => {
      try {
        const apiUrl = `https://graduation-project-mmih.vercel.app/api/Record/${actionType}/${recordId}`;
        const res = await fetch(apiUrl, { method: 'POST' });

        if (!res.ok) throw new Error('Something went wrong ❌');
        await res.json();
        setStatus('success');
        setMessage(`✅ The report has been ${actionType === 'approve' ? 'approved' : 'canceled'} successfully.`);
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Unexpected error ❌');
      }
    };

    if (recordId) performAction();
  }, [recordId, actionType]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {status === 'loading' && (
          <div style={styles.loadingContent}>
            <div style={styles.icon}>⏳</div>
            <h3 style={styles.title}>Processing Request</h3>
            <p style={styles.subtitle}>Please wait while we process your request...</p>
          </div>
        )}
        {status === 'success' && (
          <div style={styles.successContent}>
            <div style={styles.icon}>✅</div>
            <h3 style={styles.title}>Success!</h3>
            <p style={styles.subtitle}>{message}</p>
          </div>
        )}
        {status === 'error' && (
          <div style={styles.errorContent}>
            <div style={styles.icon}>❌</div>
            <h3 style={styles.title}>Error</h3>
            <p style={styles.subtitle}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f8f9fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  successContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  errorContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.5',
  },
};

export default ActionPage;
