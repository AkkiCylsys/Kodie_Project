import axios from 'axios';
import {
  fetchLoginData,
  fetchLoginSuccess,
  fetchLoginError,
  fetchRegistrationData,
  fetchRegistrationSuccess,
  fetchRegistrationError,
  fetchLogout,
} from './AuthenticationApiAction';
import { Config } from '../../../Config';

const url = Config.BASE_URL;

export const loginApiActionCreator = data => async dispatch => {
  dispatch(fetchLoginData());
  try {
    const res = await axios.post(`${url}/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.success === 'true') {
      if (res.data.code === 6) {
        const response = {
          User_key: res.data.User_Key,
          LoginStatuscode: res.data.code,
        };
        return response;
      } else {
        dispatch(fetchLoginSuccess(res.data));
        return res;
      }
    } else {
      dispatch(fetchLoginError(res.data));
      return res;
    }
  } catch (error) {
    console.error('Login API Error:', error);
    dispatch(fetchLoginError(error?.response?.data ?? error.message));
    return error?.response?.status;
  }
};

export const googlesocial_loginApi = data => async dispatch => {
  dispatch(fetchLoginData());
  try {
    const res = await axios.post(`${url}social_login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res?.data?.success === 'true') {
 
        dispatch(fetchLoginSuccess(res?.data));
        return res;
      }
     else {
      dispatch(fetchLoginError(res.data));
      return res;
    }
  } catch (error) {
    console.error('Login Scial API Error:', error);
    dispatch(fetchLoginError(error?.response?.data ?? error.message));
    return error?.response?.status;
  }
};



export const googleLoginApi = async(data) => {

  try {
    const res = await axios.post(`${url}saveSocialDetails`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
      return res;
    
  } catch (error) {
    console.error('Login API Error:', error);
    return error
  }
};

export const signupAccountApiActionCreator = data => async dispatch => {
  dispatch(fetchRegistrationData());
  try {
    const res = await axios.post(`${url}signup_step_one`,
      // 'https://kodietestapi.cylsys.com/api/v1/signup_step_one',
      // 'https://kodieapis.cylsys.com/api/v1/signup_step_one',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log();(JSON.stringify(res.data.status))
    if (res?.data?.status === true) {
      console.log(res.data,"fetchRegistrationSuccess");
      dispatch(fetchRegistrationSuccess(res?.data));
      return res;
    } else {
      dispatch(fetchRegistrationError(res?.data));
      return res;
    }
  } catch (error) {
    console.error('Signup API Error:', error);
    dispatch(fetchRegistrationError(error?.response?.data ?? error.message));
    return error;
  }
};

export const logoutActionCreator = () => async dispatch => {
  try {
    dispatch(fetchLogout());
    // Perform any other logout-related actions if needed
  } catch (error) {
    console.error('Logout Error:', error);
  }
};
