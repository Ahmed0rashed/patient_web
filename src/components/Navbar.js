import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Close mobile menu
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false); // Close mobile menu when navigating
  };


  return (
    <nav style={styles.navbar}>
      <div style={styles.container} className="navbar-container">
        {/* Logo and Brand */}
        <div style={styles.brand}>
          <Link to="/" style={styles.brandLink}>
            <div style={styles.logo}>
              
              <span style={styles.brandName} className="brand-name">Radintel</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav} className="desktop-nav">
          {isAuthenticated && (
            <Link to="/dashboard" style={styles.navLink}>
              My Records
            </Link>
          )}

        </div>

        {/* Desktop Auth Section */}
        <div style={styles.desktopAuth} className="desktop-auth">
          {isAuthenticated ? (
            <div style={styles.userSection}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>Welcome, {user?.firstName}!</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.authButtons}>
              <Link to="/login" style={styles.loginBtn}>
                Sign In
              </Link>
              <Link to="/register" style={styles.registerBtn}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          style={styles.mobileMenuBtn}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <span style={styles.hamburger}></span>
          <span style={styles.hamburger}></span>
          <span style={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={styles.mobileMenu} className="mobile-menu">
          <div style={styles.mobileNav} className="mobile-nav">
            <Link 
              to="/" 
              style={styles.mobileNavLink}
              className="mobile-nav-link"
              onClick={handleNavClick}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                style={styles.mobileNavLink}
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                My Records
              </Link>
            )}
            <Link 
              to="#" 
              style={styles.mobileNavLink}
              className="mobile-nav-link"
              onClick={handleNavClick}
            >
              About
            </Link>
            <Link 
              to="#" 
              style={styles.mobileNavLink}
              className="mobile-nav-link"
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </div>
          
          <div style={styles.mobileAuth}>
            {isAuthenticated ? (
              <div style={styles.mobileUserSection}>
                <div style={styles.mobileUserInfo}>
                  <span style={styles.mobileUserName}>
                    Welcome, {user?.firstName}!
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  style={styles.mobileLogoutBtn}
                  className="mobile-auth-button"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={styles.mobileAuthButtons}>
                <Link 
                  to="/login" 
                  style={styles.mobileLoginBtn}
                  className="mobile-auth-button"
                  onClick={handleNavClick}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  style={styles.mobileRegisterBtn}
                  className="mobile-auth-button"
                  onClick={handleNavClick}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid #475569',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
    '@media (max-width: 768px)': {
      padding: '0 16px',
      height: '60px',
    },
    '@media (max-width: 480px)': {
      padding: '0 12px',
      height: '56px',
    },
  },
  brand: {
    flex: '0 0 auto',
  },
  brandLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    fontSize: '24px',
  },
  brandName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#f1f5f9',
    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    '@media (max-width: 768px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2rem',
    },
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    flex: '1',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    position: 'relative',
  },
  desktopAuth: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    color: '#f1f5f9',
    fontSize: '14px',
    fontWeight: '500',
  },
  logoutBtn: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  loginBtn: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    border: '1px solid #475569',
  },
  registerBtn: {
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
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    flexDirection: 'column',
    gap: '4px',
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },
  hamburger: {
    width: '25px',
    height: '3px',
    background: '#f1f5f9',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    display: 'none',
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    borderTop: '1px solid #475569',
    padding: '20px',
    '@media (max-width: 768px)': {
      display: 'block',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
    },
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
    '@media (max-width: 480px)': {
      gap: '12px',
      marginBottom: '20px',
    },
  },
  mobileNavLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '12px 16px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    border: '1px solid transparent',
  },
  mobileAuth: {
    borderTop: '1px solid #475569',
    paddingTop: '20px',
  },
  mobileUserSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mobileUserInfo: {
    textAlign: 'center',
  },
  mobileUserName: {
    color: '#f1f5f9',
    fontSize: '16px',
    fontWeight: '500',
  },
  mobileLogoutBtn: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
    width: '100%',
  },
  mobileAuthButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  mobileLoginBtn: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '12px 24px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    border: '1px solid #475569',
    textAlign: 'center',
  },
  mobileRegisterBtn: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
    textAlign: 'center',
  },
};


export default Navbar;
