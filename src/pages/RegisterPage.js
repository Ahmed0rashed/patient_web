import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { registerPatient, setAuthToken } from '../services/authService';
import { addRecordToPatient } from '../services/patientRecordService';
import './AuthPages.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    nationalId: '',
    contactNumber: ''
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

  const validateForm = () => {
    const { firstName, email, password, nationalId, contactNumber } = formData;
    
    if (!firstName.trim()) {
      setError('First name is required');
      return false;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!nationalId.trim()) {
      setError('National ID is required');
      return false;
    }
    
    if (!contactNumber.trim() || contactNumber.length < 10) {
      setError('Please enter a valid contact number (at least 10 digits)');
      return false;
    }
    
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Client-side validation
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      console.log('Sending registration data:', formData);
      const response = await registerPatient(formData);
      console.log('Registration response:', response);
      
      if (response.success && response.token) {
        setAuthToken(response.token);
        // Update auth context with user data
        login(response.patient, response.token);
        
        // If there's a recordId, add it to the patient's records
        if (recordId) {
          try {
            await addRecordToPatient(response.patient._id || response.patient.id, recordId);
            setSuccess('Account created successfully! Record added to your account. Redirecting...');
          } catch (recordErr) {
            console.error('Error adding record to patient:', recordErr);
            setSuccess('Account created successfully! Redirecting...');
          }
        } else {
          setSuccess('Account created successfully! Redirecting...');
        }
        
        setTimeout(() => {
          navigate(redirectPath); // Redirect to specified path or dashboard
        }, 1000);
      }
    } catch (err) {
      // Enhanced error message handling
      if (err.message.includes('email') && err.message.includes('already')) {
        setError('This email is already registered. Please use a different email or try logging in.');
      } else if (err.message.includes('nationalId') && err.message.includes('already')) {
        setError('This National ID is already registered. Please check your details.');
      } else if (err.message.includes('validation') || err.message.includes('required')) {
        setError('Please check all fields and ensure they are filled correctly.');
      } else if (err.message.includes('email') && err.message.includes('invalid')) {
        setError('Please enter a valid email address.');
      } else if (err.message.includes('password') && err.message.includes('weak')) {
        setError('Password is too weak. Please choose a stronger password.');
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'Registration failed. Please check your information and try again.');
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

      {/* Right Side - Registration Form */}
      <div style={styles.rightSide} className="auth-right-side">
        <div style={styles.formContainer} className="auth-form-container">
          <div style={styles.formHeader}>
            <div style={styles.logoIcon}></div>
            <h1 style={styles.formTitle} className="auth-form-title">Create Account</h1>
            <p style={styles.formSubtitle} className="auth-form-subtitle">Join our medical platform</p>
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
              <div style={styles.inputIcon}>👤</div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={styles.input}
                className="auth-input"
                placeholder="First Name"
              />
            </div>

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
                placeholder="Email Address"
              />
            </div>

            <div style={styles.inputGroup} className="auth-input-group">
              <div style={styles.inputIcon}></div>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                required
                style={styles.input}
                className="auth-input"
                placeholder="National ID"
              />
            </div>

            <div style={styles.inputGroup} className="auth-input-group">
              <div style={styles.inputIcon}></div>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                style={styles.input}
                className="auth-input"
                placeholder="Contact Number"
                pattern="[0-9]{10,15}"
                title="Please enter a valid contact number (10-15 digits)"
              />
            </div>

            <div style={styles.inputGroup} className="auth-input-group">
              <div style={styles.inputIcon}></div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                className="auth-input"
                placeholder="Password"
              />
              <div style={styles.eyeIcon}></div>
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={styles.formFooter}>
            <p style={styles.footerText}>
              Already have an account?{' '}
              <Link to="/login" style={styles.link}>
                Sign In
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

export default RegisterPage;