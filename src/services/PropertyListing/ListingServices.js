import React from "react";
import axios from "axios";
import { Config } from "../../Config";
import { handleApiError } from "../../APIs/ErrorHandler";

export const insertMarketDetails = (data) => {
    const url = `${Config.BASE_URL}insert_market_details`;
  
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          if (response?.data?.success) {
            resolve(response.data.data);
          } else {
            reject(new Error(response?.data?.error || 'Unknown error'));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
        // alert(errorMessage); // Display error message in an alert
        reject(errorMessage);
        });
    });
  };
  export const UnlistMarketDetails = (data) => {
    const url = `${Config.BASE_URL}unlist_property_details`;
  
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          if (response?.data?.success) {
            resolve(response.data.data);
          } else {
            reject(new Error(response?.data?.error || 'Unknown error'));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
        // alert(errorMessage); // Display error message in an alert
        reject(errorMessage);
        });
    });
  };