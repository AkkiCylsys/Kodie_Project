import axios from "axios";
import { Config } from "../../Config";

export const acceptingLandlord = async (acceptingLandlordData) => {
  try {
    const url = Config.BASE_URL;
    const acceptingLandlordUrl = `${url}accepting_landlord`;
    console.log('acceptingLandlordUrl:', acceptingLandlordUrl);

    const response = await axios.post(acceptingLandlordUrl, acceptingLandlordData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response?.data;
  } catch (error) {
    console.error('Error in acceptingLandlord:', error); 
    throw error;
  }
};
