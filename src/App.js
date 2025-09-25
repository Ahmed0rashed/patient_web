import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import ImageViewerPage from './pages/ImageViewerPage';
import ActionPage from './pages/approveRequstes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div style={styles.app}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/showReport/:recordId" element={<RecordPage />} />
            <Route
              path="/image-viewer/:studyUID/:seriesUID"
              element={<ImageViewerPage />}
            />
            <Route path="/approved-report/:recordId" element={<ActionPage actionType="approve" />} />
            <Route path="/cancel-report/:recordId" element={<ActionPage actionType="cancel" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default App;
