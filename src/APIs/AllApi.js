// apiService.js

import axios from 'axios';
import { Config } from '../Config';

export const SignupLookupDetails = (data) => {
  const base_url = Config.BASE_URL;
  const url = `${base_url}lookup_details`;

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('API Response:', response.data);
          resolve(response.data);
        } else {
          reject(new Error('Unexpected response status: ' + response.status));
        }
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          // Axios error (network error, timeout, etc.)
          console.error('Axios error:', error.message);
          reject(new Error('Axios error: ' + error.message));
        } else if (error.response) {
          // Request was made, but server responded with an error status code
          console.error('Server responded with error:', error.response.data);
          reject(new Error('Server responded with error: ' + error.response.data));
        } else if (error.request) {
          // Request was made, but no response received
          console.error('Request made but no response received:', error.request);
          reject(new Error('Request made but no response received'));
        } else {
          // Something else happened in setting up the request
          console.error('Error setting up the request:', error.message);
          reject(new Error('Error setting up the request: ' + error.message));
        }
      });
  });
};
