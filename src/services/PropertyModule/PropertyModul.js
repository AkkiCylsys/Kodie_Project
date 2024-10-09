
import axiosInstance from "../axiosInstance";

export const getPropertyDetailSevice = async (propertyId) => {
  try {
    const detailData = {
      property_id: propertyId,
    };

    const response = await axiosInstance.post('get_property_details', detailData);

    if (response?.data?.success) {
        console.log(response?.data?.property_details[0]);
      return response?.data?.property_details[0]; // Return the property details
    } else {
      throw new Error(response?.data?.error || 'Error fetching property details');
    }
  } catch (error) {
    console.error('Error in getPropertyDetails:', error.message);
    throw error; // Throw error to handle it in the page
  }
};

export const SavePropertyDetailSevices = async (propertyData) => {
  try {
    const response = await axiosInstance.post('add_property_details', propertyData);
    return response.data; 
  } catch (error) {
    console.error('Error updating property details:', error); 
    throw error; 
  }
};

export const updatePropertyDetailSevices = async (propertyData) => {
  try {
    const response = await axiosInstance.put('update_property_details', propertyData);
    return response.data; 
  } catch (error) {
    console.error('Error updating property details:', error); 
    throw error; 
  }
};