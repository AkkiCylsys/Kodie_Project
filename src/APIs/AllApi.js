import axios from 'axios';
import {Config} from '../Config';

export const SignupLookupDetails = data => {
  const base_url = Config.BASE_URL;
  return axios({
    method: 'POST',
    url: base_url + 'lookup_details',
    data: data,
  })
    .then(response => {
      // Check if response status is successful (2xx range)
      if (response.status >= 200 && response.status < 300) {
        console.log(response?.data, 'response?.data');
        return response?.data; // Return data if response is successful
      } else {
        // Throw specific error for non-successful HTTP status codes
        throw new Error('Unexpected response status: ' + response.status);
      }
    })
    .catch(error => {
      // Check if error is due to network failure or server error
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.error('Server responded with error:', error.response?.data);
        throw new Error('Server responded with error: ' + error.response?.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received:', error.request);
        throw new Error('Request made but no response received');
      } else {
        // Something happened in setting up the request that triggered the error
        console.error('Error setting up the request:', error.message);
        throw new Error('Error setting up the request: ' + error.message);
      }
    });
};
