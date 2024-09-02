import {Config} from '../../Config';
import axios from 'axios';

export const PropertyViewApplicationService = async (propertyViewApplicationData) => {
    try {
      const url = Config.BASE_URL;
      const PropertyViewApplicationUrl = url + 'view_tenant_profile_by_bid_details';
      console.log('PropertyViewApplication url ...', PropertyViewApplicationUrl);
      const response = await axios.post(PropertyViewApplicationUrl, propertyViewApplicationData);
      return response?.data;
    } catch (error) {
      console.log('error in PropertyViewApplication ..', error);
      throw error;  // Rethrow the error for higher-level handling
    }
  };