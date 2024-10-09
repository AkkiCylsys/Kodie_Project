import axios from 'axios';
import { Config } from '../Config';
import { getToken } from './TokenManagments';
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: Config?.BASE_URL, // Replace with your API URL
    timeout: 10000,  // Set a timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // Retrieve the token from secure storage (e.g., AsyncStorage, SecureStore)
        const token = await getToken(); // You need to implement getToken()

        // If token exists, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // alert("instance..")
        return config;
    },
    (error) => {
        // Handle the request error
        return Promise.reject(error);
    }
);

// Add a response interceptor (for handling token expiration, etc.)
axiosInstance.interceptors.response.use(
    (response) => {
        // If response is successful, return the response
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // If token is expired, handle token refresh logic (optional)
        if (error.response && error.response.status === 401) {
            // Example: Refresh token logic here (if applicable)
            // const newToken = await refreshToken();
            // Set the new token for future requests
            // originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // return axiosInstance(originalRequest);
            // Otherwise, navigate to login screen
            console.log('Token expired or unauthorized. Redirecting to login...');
            // e.g., navigate to login screen
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;