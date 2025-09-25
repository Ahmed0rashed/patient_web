/**
 * Service for patient record management API calls
 */

const PATIENT_API_URL = 'http://localhost:3000/api/patients';

/**
 * Add a record to a patient
 * @param {string} patientId - Patient ID
 * @param {string} recordId - Record ID to add
 * @returns {Promise<Object>} API response
 */
export const addRecordToPatient = async (patientId, recordId) => {
  try {
    const response = await fetch(`${PATIENT_API_URL}/addRecordToPatient/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recordId: recordId
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add record to patient');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding record to patient:', error);
    throw error;
  }
};

/**
 * Get patient records
 * @param {string} patientId - Patient ID
 * @returns {Promise<Object>} Patient records
 */
export const getPatientRecords = async (patientId) => {
  try {
    const response = await fetch(`${PATIENT_API_URL}/getPatientRecords/${patientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch patient records');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching patient records:', error);
    throw error;
  }
};

const patientRecordService = {
  addRecordToPatient,
  getPatientRecords
};

export default patientRecordService;
