import axios from "axios";
import { Config } from "../../Config";
import { handleApiError } from "../../APIs/ErrorHandler";

export const GetKeyFeatures = () => {
    const url = `${Config.BASE_URL}get_key_features`;
  
    return new Promise((resolve, reject) => {
      axios.get(url)
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