// errorHandler.js

import axios from 'axios';

export const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    // Axios error (network error, timeout, etc.)
    console.error('Axios error:', error.message);
    return new Error('Axios error: ' + error.message);
  } else if (error.response) {
    // Request was made, but server responded with an error status code
    console.error('Server responded with error:', error.response.data);
    return new Error('Server responded with error: ' + error.response.data);
  } else if (error.request) {
    // Request was made, but no response received
    console.error('Request made but no response received:', error.request);
    return new Error('Request made but no response received');
  } else {
    // Something else happened in setting up the request
    console.error('Error setting up the request:', error.message);
    return new Error('Error setting up the request: ' + error.message);
  }
};
