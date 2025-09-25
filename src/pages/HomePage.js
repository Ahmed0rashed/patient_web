import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginPatient, setAuthToken } from '../services/authService';

const HomePage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
        setSuccess('Login successful! Redirecting to your records...');
        setTimeout(() => {
          navigate('/dashboard');
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
    <div style={styles.container}>
      {/* Left Side - Medical Theme */}
      <div style={styles.leftSide}>
        <div style={styles.medicalScene}>
          <div style={styles.holographicDisplay}>
            <div style={styles.displayHeader}>
              <h3 style={styles.displayTitle}>AI Medical Diagnostics</h3>
              <p style={styles.displaySubtitle}>Advanced Imaging & Analysis</p>
            </div>
            <div style={styles.bodyDiagram}>
              <div style={styles.heartIcon}>❤️</div>
              <div style={styles.brainIcon}>🧠</div>
              <div style={styles.lungIcon}>🫁</div>
            </div>
            <div style={styles.diagnosticCharts}>
              <div style={styles.chartBar}></div>
              <div style={styles.chartBar}></div>
              <div style={styles.chartBar}></div>
            </div>
          </div>
          <div style={styles.doctorFigure}>
            <div style={styles.doctorBody}></div>
            <div style={styles.stethoscope}></div>
          </div>
          <div style={styles.desk}>
            <div style={styles.laptop}></div>
          </div>
        </div>
        <div style={styles.welcomeText}>
          <h1 style={styles.welcomeTitle}>Welcome Back to Radintel</h1>
          <p style={styles.welcomeSubtitle}>
            Continue your journey in advanced medical imaging and diagnostic excellence.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={styles.rightSide}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <div style={styles.logoIcon}>🏥</div>
            <h1 style={styles.formTitle}>Welcome Back</h1>
            <p style={styles.formSubtitle}>Sign in to continue your medical journey</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {error && (
              <div style={styles.errorMessage}>
                <span style={styles.errorIcon}>⚠️</span>
                {error}
              </div>
            )}

            {success && (
              <div style={styles.successMessage}>
                <span style={styles.successIcon}>✅</span>
                {success}
              </div>
            )}

            <div style={styles.inputGroup}>
              <div style={styles.inputIcon}>📧</div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your email"
              />
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputIcon}>🔒</div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your password"
              />
              <div style={styles.eyeIcon}>👁️</div>
            </div>

            <div style={styles.optionsRow}>
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
  },
  medicalScene: {
    position: 'relative',
    width: '100%',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holographicDisplay: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    height: '200px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '2px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  displayHeader: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  displayTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0 0 5px 0',
  },
  displaySubtitle: {
    fontSize: '10px',
    color: '#e0e7ff',
    margin: 0,
  },
  bodyDiagram: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '10px 0',
  },
  heartIcon: {
    fontSize: '20px',
    animation: 'pulse 2s infinite',
  },
  brainIcon: {
    fontSize: '20px',
    animation: 'pulse 2s infinite 0.5s',
  },
  lungIcon: {
    fontSize: '20px',
    animation: 'pulse 2s infinite 1s',
  },
  diagnosticCharts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    height: '40px',
    marginTop: '10px',
  },
  chartBar: {
    width: '20px',
    background: 'linear-gradient(to top, #3b82f6, #06b6d4)',
    borderRadius: '2px',
    height: '30px',
    animation: 'grow 2s infinite alternate',
  },
  doctorFigure: {
    position: 'absolute',
    bottom: '20%',
    left: '30%',
    width: '60px',
    height: '80px',
  },
  doctorBody: {
    width: '40px',
    height: '60px',
    background: '#ffffff',
    borderRadius: '20px 20px 0 0',
    position: 'relative',
  },
  stethoscope: {
    position: 'absolute',
    top: '10px',
    right: '-10px',
    width: '20px',
    height: '20px',
    background: '#3b82f6',
    borderRadius: '50%',
  },
  desk: {
    position: 'absolute',
    bottom: '10%',
    right: '20%',
    width: '80px',
    height: '40px',
    background: '#ffffff',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  laptop: {
    width: '60px',
    height: '30px',
    background: '#1e293b',
    borderRadius: '4px',
    position: 'relative',
  },
  welcomeText: {
    position: 'absolute',
    bottom: '40px',
    left: '40px',
    right: '40px',
    color: 'white',
    textAlign: 'left',
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
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
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

export default HomePage;
