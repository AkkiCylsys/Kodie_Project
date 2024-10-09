import axios from "axios";
import { Config } from "../../Config";
const url = Config?.BASE_URL

export const sendVerificationService = (sendVerificationPayload) => {
    return axios.post(`${url}SendOTP_Forget_password`, sendVerificationPayload)
        .then((response) => {
            console.log('API Response Data SendOTP_Forget_password:', response?.data);
            return response.data; // Return response data directly
        })
        .catch((error) => {
            // Handle error and pass the error message to the calling function
            const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
            console.log("SendOTP_Forget_password error:", errorMessage);
            return Promise.reject(new Error(errorMessage)); // Reject with the error message
        });
};



export const verifyOtpServices = (data) => {
    return axios.post(`${url}verifyotp`, data)
        .then((response) => {
            console.log('API Response Data verify otp:', response.data);
            return response;  // Make sure to return the response
        })
        .catch((error) => {
            // const errorMessage = handleApiError(error);
            // alert(errorMessage); // Display error message in an alert
            console.log("forget verify otp error..", error)
            // reject(errorMessage);
        });
};



export const confirmPasswordServices = (data) => {
    return axios.post(`${url}forgetpassword`, data)
        .then((response) => {
            console.log('API Response Data confirmPassWord', response.data);
            return response;  // Make sure to return the response
        })
        .catch((error) => {
            // const errorMessage = handleApiError(error);
            // alert(errorMessage); // Display error message in an alert
            console.log("confirmPassWord error..", error)
            // reject(errorMessage);
        });
};

