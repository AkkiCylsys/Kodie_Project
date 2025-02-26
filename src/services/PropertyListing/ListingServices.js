import React from "react";
import axios from "axios";
import { Config } from "../../Config";
import { handleApiError } from "../../APIs/ErrorHandler";
import axiosInstance from "../axiosInstance";

export const insertMarketDetails = (data) => {
  
    return new Promise((resolve, reject) => {
      axiosInstance.post('insert_market_details', data)
        .then(response => {
          if (response?.data?.success) {
            resolve(response.data.data);
          } else {
            reject(new Error(response?.data?.error || 'Unknown error'));
          }
        })
        .catch(error => {
          const errorMessage = handleApiError(error);
        reject(errorMessage);
        });
    });
  };
  // export const PropertyListingDetails = (data) => {
  
  //   return new Promise((resolve, reject) => {
  //     axiosInstance.post('property_market_by_account_id', data)
  //       .then(response => {
  //         if (response?.data?.success) {
  //           resolve(response.data);
  //         } else {
  //           reject(new Error(response?.data?.error || 'Unknown error'));
  //         }
  //       })
  //       .catch(error => {
  //         const errorMessage = handleApiError(error);
  //       reject(errorMessage);
  //       });
  //   });
  // };


  export const PropertyListingDetails = (data) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post('property_market_by_account_id', data)
            .then(response => {
                if (response?.data?.success) {
                    resolve(response.data);
                } else {
                    reject(new Error(response?.data?.error || 'Unknown error'));  // Reject with error message
                }
            })
            .catch(error => {
                const errorMessage = handleApiError(error);  // Handle and transform error as needed
                reject(errorMessage);  // Reject the error to be caught in the async function
            });
    });
};


  export const UnlistMarketDetails = async (data) => {
    try {
      const response = await axiosInstance.post('unlist_property_details', data);
      if (response?.data?.success) {
        return response.data.data;
      } else {
        throw new Error(response?.data?.error || 'Unknown error occurred');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('API Error in UnlistMarketDetails:', errorMessage);
      throw new Error(errorMessage); 
    }
  };
  export const AddBidDetails = async(data) => {
    try {
      const response = await axiosInstance.post('property_market_place_enable_bidding', data);
      if (response?.data?.success) {
        return response.data.data;
      } else {
        throw new Error(response?.data?.error || 'Unknown error occurred');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('API Error in UnlistMarketDetails:', errorMessage);
      throw new Error(errorMessage); 
    }
  };