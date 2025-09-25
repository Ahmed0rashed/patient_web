import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.title}>Radintel</h3>
            <p style={styles.description}>
              Your trusted platform for managing and accessing medical reports with AI-powered explanations.
            </p>
            </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <ul style={styles.linkList}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/login" style={styles.link}>Sign In</Link></li>
              <li><Link to="/register" style={styles.link}>Register</Link></li>
              <li><a href="#" style={styles.link}>About Us</a></li>
              <li><a href="#" style={styles.link}>Contact</a></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Services</h4>
            <ul style={styles.linkList}>
              <li><a href="#" style={styles.link}>Medical Reports</a></li>
              <li><a href="#" style={styles.link}>AI Explanations</a></li>
              <li><a href="#" style={styles.link}>PDF Downloads</a></li>
              <li><a href="#" style={styles.link}>Image Viewer</a></li>
              <li><a href="#" style={styles.link}>Patient Records</a></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Support</h4>
            <ul style={styles.linkList}>
              <li><a href="#" style={styles.link}>Help Center</a></li>
              <li><a href="#" style={styles.link}>Privacy Policy</a></li>
              <li><a href="#" style={styles.link}>Terms of Service</a></li>
              <li><a href="#" style={styles.link}>FAQ</a></li>
              <li><a href="#" style={styles.link}>Report Issue</a></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
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
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 20px 24px',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    marginBottom: '32px',
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
  },
  description: {
    fontSize: '14px',
    color: '#cbd5e1',
    lineHeight: '1.6',
    marginBottom: '20px',
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
  },
  bottom: {
    borderTop: '1px solid #475569',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
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
  },
  disclaimer: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0,
    fontStyle: 'italic',
  },
  techInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  techText: {
    fontSize: '12px',
    color: '#64748b',
    margin: 0,
    padding: '6px 12px',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '20px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
};

export default Footer;
