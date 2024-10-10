import {Config} from '../../Config';
import axios from 'axios';
import axiosInstance from '../axiosInstance';

export const addressType = async addressData => {
  try {
    const url = Config.BASE_URL;
    const Address_Type_apiUrl ='get_property_details_my_acc_id';

    console.log('addressType_apiUrl...', Address_Type_apiUrl);
    const response = await axiosInstance.post(Address_Type_apiUrl, addressData);
    return response?.data;
  } catch (error) {
    console.log('error in addressType ..', error);
  }
};

export const offerForMyProperty = async (offerPropertyDataPayload) => {
  try {
    const url = Config.BASE_URL;
    const offerForMyPropertyUrl ='offer_for_my_property_by_account_id';
    console.log('offerForMyProperty url ...', offerForMyPropertyUrl);
    const response = await axiosInstance.post(offerForMyPropertyUrl, offerPropertyDataPayload);
    return response?.data;
  } catch (error) {
    console.log('error in offerForMyProperty ..', error);
    throw error;  // Rethrow the error for higher-level handling
  }
};

