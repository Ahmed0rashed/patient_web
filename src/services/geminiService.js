
const GEMINI_API_URL = 'https://graduation-project--xohomg.fly.dev/api/gemini/explain-report';

/**
 * Calls the Gemini API to get an explanation of the medical report
 * @param {string} findings - The findings from the medical report
 * @param {string} impression - The impression from the medical report
 * @returns {Promise<Object>} The API response with explanation
 */
export const explainReport = async (findings, impression) => {
  try {
    // Combine findings and impression into a single report string
    const report = `Findings: ${findings || 'No findings available'}\n\nImpression: ${impression || 'No impression available'}`;
    
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        report: report
      })
    });

    if (!response.ok) {
      // Try to get error details, but handle cases where response is not JSON
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        // If response is not JSON (e.g., HTML error page), use the status text
        console.warn('API returned non-JSON response:', response.status, response.statusText);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }

    return data.data;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

const geminiService = {
  explainReport
};

export default geminiService;
