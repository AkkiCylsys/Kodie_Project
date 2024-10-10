import axios from "axios";
import { Config } from "../../Config";
import axiosInstance from "../axiosInstance";

export const acceptingLandlord = async (acceptingLandlordData) => {
  try {
    const url = Config.BASE_URL;
    const acceptingLandlordUrl = `accepting_landlord`;
    console.log('acceptingLandlordUrl:', acceptingLandlordUrl);

    const response = await axiosInstance.post(acceptingLandlordUrl, acceptingLandlordData, {
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
