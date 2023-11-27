import axios from "axios";
import {
  fetchLoginData,
  fetchLoginSuccess,
  fetchLoginError,
  fetchRegistrationData,
  fetchRegistrationSuccess,
  fetchRegistrationError,
  fetchSendOtp,
  fetchSendOtpSuccess,
  fetchSendOtpError,
  fetchVerifyOtp,
  fetchVerifyOtpSuccess,
  fetchVerifyOtpError,
  fetchLogout,
  fetchSavePassword,
  fetchSavePasswordSuccess,
  fetchSavePasswordError,
} from "./AuthenticationApiAction";
// import { Config } from './../../../Config/index'
import { Config } from "../../../Config";

const url = Config.API_URL;

export const loginApiActionCreator = (data) => async (dispatch) => {
  //alert(url)
  dispatch(fetchLoginData());
  try {
    const res = await axios.post(url + "user_login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // alert(JSON.stringify(res))
    if (res.data.status == true) {
      dispatch(fetchLoginSuccess(res.data));
      return res;
    } else {
      //dispatch(fetchLoginError(res.data));
      return res;
    }
    //return res;
  } catch (error) {
    //alert(JSON.stringify(error?.response?.status))
    dispatch(fetchLoginError(error));
    return error?.response?.status;
  }
};
export const signupAccountApiActionCreator = (data) => async (dispatch) => {
  //alert(url)
  dispatch(fetchRegistrationData());
  try {
    const res = await axios.post(
      url + "user_save_signup_account_details",
      // "https://e3.cylsys.com/api/v1/signup_step_one",
      data,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    console.log("res....", res);
    if (res.data.status == true) {
      dispatch(fetchRegistrationSuccess(res.data));
      return res;
    } else {
      return res;
    }
    return res;
  } catch (error) {
    dispatch(fetchRegistrationError(error));
    console.log(error);
  }
};

export const logoutActionCreator = () => async (dispatch) => {
  try {
    dispatch(fetchLogout());
  } catch (error) {
    console.log(error);
  }
};
