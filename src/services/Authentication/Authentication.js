import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import { Config } from '../../Config';

const secretKey = 'XkhZG4fW2t2W';

export const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const key = CryptoJS.enc.Utf8.parse(secretKey);
      const iv = CryptoJS.enc.Utf8.parse(secretKey);
      const enc = CryptoJS.AES.encrypt(password, key, { iv: iv });
      resolve(enc.toString());
    } catch (error) {
      reject(error);
    }
  });
};

// sign up Api
export const signup = (data) => {
  const base_url = Config.BASE_URL;
  const url = `${base_url}register`;
console.log(url);
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response?.data) {
          console.log('API Response:', response.data);
          resolve(response.data);
        } else {
          console.error('Invalid response data format:', response);
          reject(new Error('Invalid response data format'));
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

// send code Api
export const signupSendCode = (data) => {
  const base_url = Config.BASE_URL;
  const url = `${base_url}SendOTP`;

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response?.data) {
          console.log('API Response:', response.data);
          resolve(response.data);
        } else {
          console.error('Invalid response data format:', response);
          reject(new Error('Invalid response data format'));
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

// Varifiction api
export const SignupVerification = (data) => {
  const base_url = Config.BASE_URL;
  const url = `${base_url}verifyotp`;

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response?.data) {
          console.log('API Response:', response.data);
          resolve(response.data);
        } else {
          console.error('Invalid response data format:', response);
          reject(new Error('Invalid response data format'));
        }
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
          reject(new Error('Axios error: ' + error.message));
        } else if (error.response) {
          console.error('Server responded with error:', error.response.data);
          reject(new Error('Server responded with error: ' + error.response.data));
        } else if (error.request) {
          console.error('Request made but no response received:', error.request);
          reject(new Error('Request made but no response received'));
        } else {
          console.error('Error setting up the request:', error.message);
          reject(new Error('Error setting up the request: ' + error.message));
        }
      });
  });
};