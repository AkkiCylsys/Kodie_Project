
import axiosInstance from "../axiosInstance";

export const getPropertyFilterSevice = async (filterData) => {
  try {
    const response = await axiosInstance.post('get_property_details_by_filter', filterData);

    if (response?.data?.success === true) {
      // Log and return property details
      console.log('Property Details:', response?.data?.property_details);
      return response?.data?.property_details;
    } else {
      // Log the error message from the response or a default message
      const errorMessage = response?.data?.error || 'Failed to fetch property details';
      console.error('Error from server:', errorMessage);
      throw new Error(errorMessage); // Throw error to be caught in the calling function
    }
  } catch (error) {
    // Log and rethrow the error to be handled in the calling function
    console.error('Error in getPropertyFilterSevice:', error.message || error);
    throw error;
  }
};
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

export const savePropertyImageService = async (formData) => {
  try {
    const response = await axiosInstance.post('add_property_images_videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // FormData ke liye content type set karein
      },
    });
    return response.data; // Response ko return karein
  } catch (error) {
    console.error('Error save data:', error.response.data);
    throw error; // Error ko handle karein
  }
};
export const updatePropertyImageService = async (formData) => {
  try {
    const response = await axiosInstance.put('update_property_images_video_details', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // FormData ke liye content type set karein
      },
    });
    return response.data; // Response ko return karein
  } catch (error) {
    console.error('Error uploading data:', error);
    throw error; // Error ko handle karein
  }
}

export const archiveSevices = async (propertyId) => {
  try {
    const response = await axiosInstance.post('archieve_property', propertyId);
    return response.data; 
  } catch (error) {
    console.error('Error archive property details:', error); 
    throw error; 
  }
};
export const deletePropertySevices = async (data) => {
  console.log(data,"datadatadata");
  try {
    const response = await axiosInstance.delete('delete_property_by_id', {
      data: data, // Include the data in the 'data' field of the options object
      headers: {
        'Content-Type': 'application/json', // Set Content-Type for JSON
      },
    });
    if (response?.data?.success) {
      return response.data; // Return the full response if successful
    } else {
      throw new Error(response?.data?.error || 'Unknown error');
    }
  } catch (error) {
    console.error('Error in deletePropertySevices:', error);
    throw error; // Rethrow error to be handled in the calling function
  }
};