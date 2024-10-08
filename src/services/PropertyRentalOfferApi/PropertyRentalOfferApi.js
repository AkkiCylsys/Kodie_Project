import {Config} from '../../Config';
import axios from 'axios';
const url = Config.BASE_URL;
const currentOffer_apiUrl = url + 'get_current_offer_account_id';

export const getCurrentOffer = async current_Data => {
  try {
    console.log('filter_apiUrl...', currentOffer_apiUrl);
    const response = await axios.post(currentOffer_apiUrl, current_Data);
    return response?.data;
  } catch (error) {
    console.log('error in current offer ..', error);
  }
};

export const withdowBidServices = async WithdrawData => {
  try {
    const url = Config.BASE_URL;
    const withdowBid_url = url + 'withdraw_bid_by_tenant';
    console.log('filter_apiUrl...', withdowBid_url);
    const response = await axios.post(withdowBid_url, WithdrawData);
    return response?.data;
  } catch (error) {
    console.log('error in withdowBid_url..', error);
  }
};

export const acceptTenants = async acceptTenantsData => {
  try {
    const url = Config.BASE_URL;
    const acceptTenants_url = url + 'accepting_tenant';
    console.log('aacceptTenants_urlUrl...', acceptTenants_url);
    const response = await axios.post(acceptTenants_url, acceptTenantsData);
    return response?.data;
  } catch (error) {
    console.log('error in acceptTenants_url..', error);
  }
};
