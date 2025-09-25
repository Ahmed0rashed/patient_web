import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginPatient, setAuthToken } from '../services/authService';
import { addRecordToPatient } from '../services/patientRecordService';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Get URL parameters
  const [searchParams] = useSearchParams();
  const recordId = searchParams.get('recordId');
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await loginPatient(formData);
      
      if (response.token) {
        setAuthToken(response.token);
        // Update auth context with user data
        login(response.patient, response.token);
        
        // If there's a recordId, add it to the patient's records
        if (recordId) {
          try {
            await addRecordToPatient(response.patient._id || response.patient.id, recordId);
            setSuccess('Login successful! Record added to your account. Redirecting...');
          } catch (recordErr) {
            console.error('Error adding record to patient:', recordErr);
            setSuccess('Login successful! Redirecting...');
          }
        } else {
          setSuccess('Login successful! Redirecting...');
        }
        
        setTimeout(() => {
          navigate(redirectPath); // Redirect to specified path or dashboard
        }, 1000);
      }
    } catch (err) {
      // Enhanced error message handling
      if (err.message.includes('Invalid credentials') || err.message.includes('incorrect')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (err.message.includes('not found') || err.message.includes('does not exist')) {
        setError('No account found with this email. Please check your email or create a new account.');
      } else if (err.message.includes('password')) {
        setError('Incorrect password. Please try again or reset your password.');
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container} className="auth-container">
          {/* Left Side - Welcome Text Only */}
          <div style={styles.leftSide} className="auth-left-side">
            <div style={styles.welcomeText}>
              <h1 style={styles.welcomeTitle} className="auth-welcome-title">Welcome to Radintel</h1>
              <p style={styles.welcomeSubtitle} className="auth-welcome-subtitle">
                Your trusted platform for advanced medical imaging and AI-powered diagnostic excellence.
              </p>
            </div>
          </div>

      {/* Right Side - Login Form */}
      <div style={styles.rightSide} className="auth-right-side">
        <div style={styles.formContainer} className="auth-form-container">
          <div style={styles.formHeader}>
            <div style={styles.logoIcon}></div>
            <h1 style={styles.formTitle} className="auth-form-title">Welcome Back</h1>
            <p style={styles.formSubtitle} className="auth-form-subtitle">Sign in to continue your medical journey</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form} className="auth-form">
            {error && (
              <div style={styles.errorMessage} className="auth-message">
                <span style={styles.errorIcon}></span>
                {error}
              </div>
            )}

            {success && (
              <div style={styles.successMessage} className="auth-message">
                <span style={styles.successIcon}></span>
                {success}
              </div>
            )}

            <div style={styles.inputGroup} className="auth-input-group">
              <div style={styles.inputIcon}></div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                className="auth-input"
                placeholder="Enter your email"
              />
            </div>

            <div style={styles.inputGroup} className="auth-input-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                className="auth-input"
                placeholder="Enter your password"
              />
              <div style={styles.eyeIcon}></div>
            </div>

            <div style={styles.optionsRow} className="auth-options-row">
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} />
                Remember me
              </label>
              <button type="button" style={styles.forgotLink}>Forgot Password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {})
              }}
              className="auth-submit-button"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={styles.formFooter}>
            <p style={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/register" style={styles.link}>
                Create One
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  // Left Side - Medical Theme
  leftSide: {
    flex: '1',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      padding: '20px',
      minHeight: '40vh',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
      minHeight: '35vh',
    },
  },
      welcomeText: {
        color: 'white',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '0 auto',
      },
  welcomeTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 16px 0',
    lineHeight: '1.2',
  },
  welcomeSubtitle: {
    fontSize: '1.1rem',
    margin: 0,
    opacity: 0.9,
    lineHeight: '1.5',
  },
  // Right Side - Form
  rightSide: {
    flex: '1',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    '@media (max-width: 768px)': {
      padding: '20px',
      minHeight: '60vh',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
      minHeight: '65vh',
    },
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoIcon: {
    fontSize: '2rem',
    marginBottom: '16px',
  },
  formTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  formSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    fontSize: '16px',
    zIndex: 1,
  },
  input: {
    width: '100%',
    padding: '12px 16px 12px 40px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    outline: 'none',
    background: '#ffffff',
  },
  eyeIcon: {
    position: 'absolute',
    right: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    zIndex: 1,
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
  },
  forgotLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  submitButton: {
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
    width: '100%',
  },
  submitButtonDisabled: {
    background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  errorMessage: {
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    padding: '16px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorIcon: {
    fontSize: '16px',
    flexShrink: 0,
  },
  successMessage: {
    color: '#059669',
    backgroundColor: '#ecfdf5',
    border: '1px solid #a7f3d0',
    padding: '16px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  successIcon: {
    fontSize: '16px',
    flexShrink: 0,
  },
  formFooter: {
    textAlign: 'center',
    marginTop: '24px',
  },
  footerText: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default LoginPage;
