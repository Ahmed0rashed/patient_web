/**
 * Service for patient authentication API calls
 */

const AUTH_API_URL = 'http://localhost:3000/api/patientAuth';

/**
 * Register a new patient
 * @param {Object} patientData - Patient registration data
 * @param {string} patientData.firstName - Patient's first name
 * @param {string} patientData.email - Patient's email
 * @param {string} patientData.password - Patient's password
 * @param {string} patientData.nationalId - Patient's national ID
 * @param {string} patientData.contactNumber - Patient's contact number
 * @returns {Promise<Object>} Registration response
 */
export const registerPatient = async (patientData) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/registerPatient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering patient:', error);
    throw error;
  }
};

/**
 * Login a patient
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - Patient's email
 * @param {string} credentials.password - Patient's password
 * @returns {Promise<Object>} Login response
 */
export const loginPatient = async (credentials) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/loginPatient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in patient:', error);
    throw error;
  }
};

/**
 * Store authentication token in localStorage
 * @param {string} token - JWT token
 */
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} JWT token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    // Basic JWT token validation (check if not expired)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

const authService = {
  registerPatient,
  loginPatient,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  isAuthenticated
};

export default authService;
