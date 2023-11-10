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

export const loginApiActionCreator = (data) => async dispatch => {
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
export const logoutActionCreator = () => async (dispatch) => {
  try {
    dispatch(fetchLogout());
  } catch (error) {
    console.log(error);
  }
};

