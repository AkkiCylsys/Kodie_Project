import {Config} from '../../Config';
import axiosInstance from '../axiosInstance';

export const PropertyViewApplicationService =
  async propertyViewApplicationData => {
    try {
      const url = Config.BASE_URL;
      const PropertyViewApplicationUrl =
       'view_tenant_profile_by_bid_details';
      console.log(
        'PropertyViewApplication url ...',
        PropertyViewApplicationUrl,
      );
      const response = await axiosInstance.post(
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
      'question_details_for_tenant_ques';
    console.log(
      'QuestionDetailsForTenantQues Url ...',
      QuestionDetailsForTenantQuesUrl,
    );
    const response = await axiosInstance.post(
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
      const savelandAccDeatils ='save_landlord_accepting_details';
      console.log('savelandAccDeatils Url ...', savelandAccDeatils);
      const response = await axiosInstance.post(
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
        'update_landlord_accepting_details';
      console.log(
        'UpdateLandLordAcceptingService Url ...',
        UpdateLandLordAcceptingurl,
      );
      const response = await axiosInstance.post(
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
      const getLandlordDetailsByAcceptingIdUrl ='get_landlord_details_by_accepting_id';
      console.log('getLandlordDetailsByAcceptingIdUrl ...', getLandlordDetailsByAcceptingIdUrl);
      const response = await axiosInstance.post(
        getLandlordDetailsByAcceptingIdUrl,
        getLandlordDetailsByAcceptingIdPayload,
      );
      return response?.data;
    } catch (error) {
      console.log('error in getLandlordDetailsByAcceptingId ..', error);
      throw error; // Rethrow the error for higher-level handling
    }
  };
