import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo and Brand */}
        <div style={styles.brand}>
          <Link to="/" style={styles.brandLink}>
            <div style={styles.logo}>
              
              <span style={styles.brandName}>Radintel</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav}>
          {isAuthenticated && (
            <Link to="/dashboard" style={styles.navLink}>
              My Records
            </Link>
          )}

        </div>

        {/* Desktop Auth Section */}
        <div style={styles.desktopAuth}>
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
          aria-label="Toggle menu"
        >
          <span style={styles.hamburger}></span>
          <span style={styles.hamburger}></span>
          <span style={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileNav}>
            <Link 
              to="/" 
              style={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                style={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                My Records
              </Link>
            )}
            <Link 
              to="#" 
              style={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="#" 
              style={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
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
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  style={styles.mobileLogoutBtn}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={styles.mobileAuthButtons}>
                <Link 
                  to="/login" 
                  style={styles.mobileLoginBtn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  style={styles.mobileRegisterBtn}
                  onClick={() => setIsMenuOpen(false)}
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
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    flex: '1',
    justifyContent: 'center',
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
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
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

// Add responsive styles
const mediaQuery = `@media (max-width: 768px) {
  .desktop-nav { display: none !important; }
  .desktop-auth { display: none !important; }
  .mobile-menu-btn { display: flex !important; }
  .mobile-menu { display: block !important; }
}`;

// Inject media query
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = mediaQuery;
  document.head.appendChild(style);
}

export default Navbar;
