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
    //const res = await axios.get(url + loginParameters)
    const res = await axios.post(url + "user_login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status == true) {
      dispatch(fetchLoginSuccess(res.data));
      return res;
    } else {
      return res;
    }
    return res;
  } catch (error) {
    dispatch(fetchLoginError(error));
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

export const RegisterAsAgent = async (data) => {
  // dispatch(fetchLoginData());
  try {
    const res = await axios.post(
      url + "AgentRequest/AddEditAgentRequest",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
