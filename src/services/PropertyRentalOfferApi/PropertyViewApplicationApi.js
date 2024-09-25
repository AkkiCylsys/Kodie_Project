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


  export const QuestionDetailsForTenantQues = async (TenantQuestPayload) => {
    try {
      const url = Config.BASE_URL;
      const QuestionDetailsForTenantQuesUrl = url + 'question_details_for_tenant_ques';
      console.log('QuestionDetailsForTenantQues Url ...', QuestionDetailsForTenantQuesUrl);
      const response = await axios.post(QuestionDetailsForTenantQuesUrl, TenantQuestPayload);
      return response?.data;
    } catch (error) {
      console.log('error in QuestionDetailsForTenantQuesUrl ..', error);
      throw error;  // Rethrow the error for higher-level handling
    }
  };




