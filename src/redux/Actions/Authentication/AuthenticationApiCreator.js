import axios from 'axios';
import {
  fetchLoginData, fetchLoginSuccess,
  fetchLoginError, fetchRegistrationData,
  fetchRegistrationSuccess, fetchRegistrationError,
  fetchSendOtp, fetchSendOtpSuccess,
  fetchSendOtpError, fetchVerifyOtp,
  fetchVerifyOtpSuccess, fetchVerifyOtpError,
  fetchLogout,fetchSavePassword,
  fetchSavePasswordSuccess,fetchSavePasswordError
} from './AuthenticationApiAction';
import { Config } from './../../../Config/index'

const url = Config.DEV_API_URL;

export const loginApiActionCreator = (data) => async dispatch => {
 //alert(url)
  dispatch(fetchLoginData());
  try {
    //const res = await axios.get(url + loginParameters)
    const res =  await axios.post(url+'AuthenticationWebApi/dologin', data,{
      "headers": {
          "Content-Type": "application/json",
          },
    })


    dispatch(fetchLoginSuccess(res));
    return res;
  }
  catch (error) {
    dispatch(fetchLoginError(error));
    console.log(error);
  }

}
export const logoutActionCreator = () => async dispatch => {
  try {
    dispatch(fetchLogout());
  }
  catch (error) {
    console.log(error);
  }
}


export const RegisterAsAgent = async(data) => {
  // dispatch(fetchLoginData());
   try {
     const res =  await axios.post(url+'AgentRequest/AddEditAgentRequest', data,{
       "headers": {
           "Content-Type": "application/json",
           },
     })
     return res;
   }
   catch (error) {
     console.log(error);
   }
 
 }
 