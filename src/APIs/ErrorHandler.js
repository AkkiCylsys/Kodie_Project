// errorHandler.js
import axios from 'axios';
import { Alert } from 'react-native';

export const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    // Axios error (network error, timeout, etc.)
    console.error('Axios error:', error.message);
    // return error.message;
  } else if (error.response) {
    // Request was made, but server responded with an error status code
    const { status, data } = error.response;
    let errorMessage = '';

    switch (status) {
      case 400:
        errorMessage = 'Bad Request: ' + data.message;
        break;
      case 401:
        errorMessage = 'Unauthorized: ' + data.message;
        break;
      case 402:
        errorMessage = 'Payment Required: ' + data.message;
        break;
      case 404:
        errorMessage = 'Not Found: ' + data.message;
        break;
      case 500:
        errorMessage = 'Internal Server Error: ' + data.message;
        break;
      default:
        errorMessage = 'Server Error: ' + data.message;
    }

    console.error(errorMessage);
    return errorMessage;
  } else if (error.request) {
    // Request was made, but no response received
    console.error('Request made but no response received:', error.request);
    return 'No response from server.';
  } else {
    // Something else happened in setting up the request
    console.error('Error setting up the request:', error.message);
    return 'Error setting up the request: ' + error.message;
  }
};

