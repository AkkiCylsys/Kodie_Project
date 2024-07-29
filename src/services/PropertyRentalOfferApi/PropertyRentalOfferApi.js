import {Config} from '../../Config';
import axios from 'axios';
const url = Config.BASE_URL;
const currentOffer_apiUrl = url + 'get_current_offer_account_id';

export const getCurrentOffer = async current_Data => {
  try {
    console.log('filter_apiUrl...', currentOffer_apiUrl);
    const response = await axios.post(currentOffer_apiUrl, current_Data);
    return response?.data
  } catch (error) {
    console.log('error in current offer ..', error);
  }
};
