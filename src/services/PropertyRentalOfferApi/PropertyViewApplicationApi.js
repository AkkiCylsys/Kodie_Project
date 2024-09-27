import {Config} from '../../Config';
import axios from 'axios';

export const PropertyViewApplicationService =
  async propertyViewApplicationData => {
    try {
      const url = Config.BASE_URL;
      const PropertyViewApplicationUrl =
        url + 'view_tenant_profile_by_bid_details';
      console.log(
        'PropertyViewApplication url ...',
        PropertyViewApplicationUrl,
      );
      const response = await axios.post(
        PropertyViewApplicationUrl,
        propertyViewApplicationData,
      );
      return response?.data;
    } catch (error) {
      console.log('error in PropertyViewApplication ..', error);
      throw error; // Rethrow the error for higher-level handling
    }
  };

export const QuestionDetailsForTenantQues = async TenantQuestPayload => {
  try {
    const url = Config.BASE_URL;
    const QuestionDetailsForTenantQuesUrl =
      url + 'question_details_for_tenant_ques';
    console.log(
      'QuestionDetailsForTenantQues Url ...',
      QuestionDetailsForTenantQuesUrl,
    );
    const response = await axios.post(
      QuestionDetailsForTenantQuesUrl,
      TenantQuestPayload,
    );
    return response?.data;
  } catch (error) {
    console.log('error in QuestionDetailsForTenantQuesUrl ..', error);
    throw error; // Rethrow the error for higher-level handling
  }
};

export const saveLandLordAcceptingService =
  async saveAcceptingDetailsPayload => {
    try {
      const url = Config.BASE_URL;
      const savelandAccDeatils = url + 'save_landlord_accepting_details';
      console.log('savelandAccDeatils Url ...', savelandAccDeatils);
      const response = await axios.post(
        savelandAccDeatils,
        saveAcceptingDetailsPayload,
      );
      return response?.data;
    } catch (error) {
      console.log('error in savelandAccDeatils ..', error);
      throw error; // Rethrow the error for higher-level handling
    }
  };

export const UpdateLandLordAcceptingService =
  async updateAcceptingDetailsPayload => {
    try {
      const url = Config.BASE_URL;
      const UpdateLandLordAcceptingurl =
        url + 'update_landlord_accepting_details';
      console.log(
        'UpdateLandLordAcceptingService Url ...',
        UpdateLandLordAcceptingurl,
      );
      const response = await axios.post(
        UpdateLandLordAcceptingurl,
        updateAcceptingDetailsPayload,
      );
      return response?.data;
    } catch (error) {
      console.log('error in UpdateLandLordAcceptingService ..', error);
      throw error; // Rethrow the error for higher-level handling
    }
  };

  export const getLandlordDetailsByAcceptingId =
  async getLandlordDetailsByAcceptingIdPayload => {
    try {
      const url = Config.BASE_URL;
      const getLandlordDetailsByAcceptingIdUrl = url + 'get_landlord_details_by_accepting_id';
      console.log('getLandlordDetailsByAcceptingIdUrl ...', getLandlordDetailsByAcceptingIdUrl);
      const response = await axios.post(
        getLandlordDetailsByAcceptingIdUrl,
        getLandlordDetailsByAcceptingIdPayload,
      );
      return response?.data;
    } catch (error) {
      console.log('error in getLandlordDetailsByAcceptingId ..', error);
      throw error; // Rethrow the error for higher-level handling
    }
  };
