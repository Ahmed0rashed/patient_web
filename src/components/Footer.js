import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content} className="footer-content">
          <div style={styles.section} className="footer-section">
            <h3 style={styles.title}>Radintel</h3>
            <p style={styles.description}>
              Your trusted platform for managing and accessing medical reports with AI-powered explanations.
            </p>
            </div>

          <div style={styles.section} className="footer-section">
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <ul style={styles.linkList} className="footer-links">
              <li><Link to="/" style={styles.link} className="footer-link">Home</Link></li>
              <li><Link to="/login" style={styles.link} className="footer-link">Sign In</Link></li>
              <li><Link to="/register" style={styles.link} className="footer-link">Register</Link></li>
              <li><button style={styles.linkButton} className="footer-link-button">About Us</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">Contact</button></li>
            </ul>
          </div>

          <div style={styles.section} className="footer-section">
            <h4 style={styles.sectionTitle}>Services</h4>
            <ul style={styles.linkList} className="footer-links">
              <li><button style={styles.linkButton} className="footer-link-button">Medical Reports</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">AI Explanations</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">PDF Downloads</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">Image Viewer</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">Patient Records</button></li>
            </ul>
          </div>

          <div style={styles.section} className="footer-section">
            <h4 style={styles.sectionTitle}>Support</h4>
            <ul style={styles.linkList} className="footer-links">
              <li><button style={styles.linkButton} className="footer-link-button">Help Center</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">Privacy Policy</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">Terms of Service</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">FAQ</button></li>
              <li><button style={styles.linkButton} className="footer-link-button">Report Issue</button></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom} className="footer-bottom">
          <div style={styles.copyright}>
            <p style={styles.copyrightText}>
              Medical Report System. All rights reserved.
            </p>
            <p style={styles.disclaimer}>
              Always consult with healthcare professionals.
            </p>
          </div>
          <div style={styles.techInfo}>
            <p style={styles.techText}>
              Powered by AI Technology 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    color: '#f8fafc',
    marginTop: 'auto',
    borderTop: '1px solid #475569',
    '@media (max-width: 768px)': {
      padding: '32px 16px 16px',
    },
    '@media (max-width: 480px)': {
      padding: '24px 12px 12px',
    },
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 20px 24px',
    '@media (max-width: 768px)': {
      padding: '32px 16px 16px',
    },
    '@media (max-width: 480px)': {
      padding: '24px 12px 12px',
    },
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '24px',
      marginBottom: '24px',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr',
      gap: '20px',
      marginBottom: '20px',
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    '@media (max-width: 768px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2rem',
      marginBottom: '8px',
    },
  },
  description: {
    fontSize: '14px',
    color: '#cbd5e1',
    lineHeight: '1.6',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      fontSize: '13px',
      marginBottom: '16px',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
      marginBottom: '12px',
      lineHeight: '1.5',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: '12px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '50%',
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: '16px',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      marginBottom: '12px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
      marginBottom: '10px',
    },
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '14px',
    lineHeight: '2',
    transition: 'all 0.2s ease',
    display: 'block',
    padding: '2px 0',
    '@media (max-width: 768px)': {
      fontSize: '13px',
      padding: '4px 0',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
      padding: '6px 0',
      minHeight: '32px',
      display: 'flex',
      alignItems: 'center',
    },
  },
  linkButton: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '14px',
    lineHeight: '2',
    transition: 'all 0.2s ease',
    display: 'block',
    padding: '2px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    '@media (max-width: 768px)': {
      fontSize: '13px',
      padding: '4px 0',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
      padding: '6px 0',
      minHeight: '32px',
      display: 'flex',
      alignItems: 'center',
    },
  },
  bottom: {
    borderTop: '1px solid #475569',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    '@media (max-width: 768px)': {
      paddingTop: '20px',
      gap: '12px',
    },
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: '16px',
      gap: '8px',
    },
  },
  copyright: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  copyrightText: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '13px',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  disclaimer: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0,
    fontStyle: 'italic',
    '@media (max-width: 768px)': {
      fontSize: '11px',
    },
    '@media (max-width: 480px)': {
      fontSize: '10px',
    },
  },
  techInfo: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      alignSelf: 'flex-start',
    },
  },
  techText: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0,
    padding: '6px 12px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '20px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    '@media (max-width: 768px)': {
      fontSize: '11px',
      padding: '4px 10px',
    },
    '@media (max-width: 480px)': {
      fontSize: '10px',
      padding: '3px 8px',
    },
  },
};

export default Footer;
