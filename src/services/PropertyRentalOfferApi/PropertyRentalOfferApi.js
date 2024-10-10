import {Config} from '../../Config';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
const url = Config.BASE_URL;
const currentOffer_apiUrl ='get_current_offer_account_id';

export const getCurrentOffer = async current_Data => {
  try {
    console.log('filter_apiUrl...', currentOffer_apiUrl);
    const response = await axiosInstance.post(currentOffer_apiUrl, current_Data);
    return response?.data;
  } catch (error) {
    console.log('error in current offer ..', error);
  }
};

export const withdowBidServices = async WithdrawData => {
  try {
    const url = Config.BASE_URL;
    const withdowBid_url = 'withdraw_bid_by_tenant';
    console.log('filter_apiUrl...', withdowBid_url);
    const response = await axiosInstance.post(withdowBid_url, WithdrawData);
    return response?.data;
  } catch (error) {
    console.log('error in withdowBid_url..', error);
  }
};

export const acceptTenants = async acceptTenantsData => {
  try {
    const url = Config.BASE_URL;
    const acceptTenants_url ='accepting_tenant';
    console.log('aacceptTenants_urlUrl...', acceptTenants_url);
    const response = await axiosInstance.post(acceptTenants_url, acceptTenantsData);
    return response?.data;
  } catch (error) {
    console.log('error in acceptTenants_url..', error);
  }
};
