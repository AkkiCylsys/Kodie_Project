import axiosInstance from "../axiosInstance";

export const accountDetailsServices = (loginData) => {
    return axiosInstance
      .get(`getAccount_details/${loginData?.Login_details?.user_account_id}`)
      .then((response) => {
        console.log('API Response Data accountDetails', response.data);
        return response;  // Return the response to be handled in getPersonalDetails
      })
      .catch((error) => {
        console.log("accountDetails error..", error);
        throw error;  // Ensure the error is thrown to be caught in the calling function
      });
  };