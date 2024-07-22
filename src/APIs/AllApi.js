// apiService.js

import axios from 'axios';
import { Config } from '../Config';
import { handleApiError } from './ErrorHandler';


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
        reject(handleApiError(error));
      });
  });
};
