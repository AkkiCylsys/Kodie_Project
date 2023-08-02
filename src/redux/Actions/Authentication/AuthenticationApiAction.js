import AUTHENTICATION_ACTION_TYPES from './AuthenticationActionTypes.js';

export const fetchLoginData = () => ({
  type: AUTHENTICATION_ACTION_TYPES.API_LOGIN,
});

export const fetchLoginSuccess = (data) => ({
  
  type: AUTHENTICATION_ACTION_TYPES.API_LOGIN_SUCCESS,
  payload: data,
});

export const fetchLoginError = (error) => ({
  type: AUTHENTICATION_ACTION_TYPES.API_LOGIN_ERROR,
  payload: error,
});

// for registration

export const fetchRegistrationData = () => ({
  type: AUTHENTICATION_ACTION_TYPES.API_REGISTRATION,
});

export const fetchRegistrationSuccess = (data) => ({
  
  type: AUTHENTICATION_ACTION_TYPES.API_REGISTRATION_SUCCESS,
  payload: data,
});

export const fetchRegistrationError = (error) => ({
  type: AUTHENTICATION_ACTION_TYPES.API_REGISTRATION_ERROR,
  payload: error,
});

// for Sent OTP
export const fetchSendOtp = () => ({
  type: AUTHENTICATION_ACTION_TYPES.API_SENT_OTP,
});

export const fetchSendOtpSuccess = (data) => ({
  
  type: AUTHENTICATION_ACTION_TYPES.API_SENT_OTP_SUCCESS,
  payload: data,
});

export const fetchSendOtpError = (error) => ({
  type: AUTHENTICATION_ACTION_TYPES.API_SENT_OTP_ERROR,
  payload: error,
});

// for Verify OTP
export const fetchVerifyOtp = () => ({
  type: AUTHENTICATION_ACTION_TYPES.API_VERIFY_OTP,
});

export const fetchVerifyOtpSuccess = (data) => ({
  
  type: AUTHENTICATION_ACTION_TYPES.API_VERIFY_OTP_SUCCESS,
  payload: data,
});

export const fetchVerifyOtpError = (error) => ({
  type: AUTHENTICATION_ACTION_TYPES.API_VERIFY_OTP_ERROR,
  payload: error,
});


  // for Save Password of forgot password 
export const fetchSavePassword = () => ({
  type: AUTHENTICATION_ACTION_TYPES.API_SAVE_PASSWORD,
});

export const fetchSavePasswordSuccess = (data) => ({
  
  type: AUTHENTICATION_ACTION_TYPES.API_SAVE_PASSWORD_SUCCESS,
  payload: data,
});

export const fetchSavePasswordError = (error) => ({
  type: AUTHENTICATION_ACTION_TYPES.API_SAVE_PASSWORD_ERROR,
  payload: error,
});


// for logout 
export const fetchLogout = () => ({
  type: AUTHENTICATION_ACTION_TYPES.USER_LOGOUT,

});