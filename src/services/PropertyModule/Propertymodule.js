import { Config } from "../../Config";
import { handleApiError } from "../../APIs/ErrorHandler";
import axiosInstance from "../axiosInstance";

export const GetKeyFeatures = () => {
    const url = `get_key_features`;
  
    return new Promise((resolve, reject) => {
      axiosInstance.get(url)
        .then(response => {
          if (response?.data?.success) {
            resolve(response?.data?.data); // Resolve with the inspection areas data
          } else {
            reject(new Error(response?.data?.error || 'Failed to fetch inspection areas'));
          }
        })
        .catch(error => {
          reject(handleApiError(error)); // Handle and reject with the appropriate error
        });
    });
  };