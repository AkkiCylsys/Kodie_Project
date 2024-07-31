import {Config} from '../../Config';
import axios from 'axios';

export const addressType = async addressData => {
  try {
    const url = Config.BASE_URL;
    const Address_Type_apiUrl = url + 'get_property_details_my_acc_id';

    console.log('addressType_apiUrl...', Address_Type_apiUrl);
    const response = await axios.post(Address_Type_apiUrl, addressData);
    return response?.data;
  } catch (error) {
    console.log('error in addressType ..', error);
  }
};

export const offerForMyProperty = async (offerPropertyData) => {
  try {
    const url = Config.BASE_URL;
    const offerForMyPropertyUrl = url + 'offer_for_my_property_by_account_id';
    console.log('offerForMyProperty url ...', offerForMyPropertyUrl);
    const response = await axios.post(offerForMyPropertyUrl, offerPropertyData);
    return response?.data;
  } catch (error) {
    console.log('error in offerForMyProperty ..', error);
    throw error;  // Rethrow the error for higher-level handling
  }
};
