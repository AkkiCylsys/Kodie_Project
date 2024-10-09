import axiosInstance from "../axiosInstance";

export const getJobListFilterServices = async (data) => {
    try {
        const response = await axiosInstance.post('job/getJobbyFilter_Service', data);
        return response;
    } catch (error) {
        console.error('Error in getJobListFilterServices:', error);
        throw error;
    }
};
export const getJobListFilterRequestServices = async (data) => {
    try {
        // Send the request to the server using axios instance
        const response = await axiosInstance.post('job/getJobbyFilter', data);
        return response;  // Return full response for flexibility
    } catch (error) {
        console.error('Error in getJobListFilterRequestServices:', error.message || error);
        throw error;  // Rethrow to propagate the error upwards
    }
};

export const getJobDeleteServices = async (jobId) => {
    try {
        const response = await axiosInstance.delete(`job/deletejob/${jobId}`);  // Use axiosInstance to send the DELETE request
        return response;  // Return full response for flexibility
    } catch (error) {
        console.error('Error in getJobDeleteServices:', error.message || error);
        throw error;  // Rethrow to propagate the error upwards
    }
};


export const getAddressTypeServices = async (data) => {
    try {
        const response = await axiosInstance.post('get_property_details_my_acc_id', data);
        return response;
    } catch (error) {
        console.error('Error in getJobListFilterServices:', error);
        throw error;
    }
};

export const getJobDetailServices = async (data) => {
    try {
        const response = await axiosInstance.post('job/get', data);
        return response;
    } catch (error) {
        console.error('Error in getJobListFilterServices:', error);
        throw error;
    }
};
export const createJobServices = async (data) => {
    try {
        const response = await axiosInstance.post('job/create', data);
        return response;
    } catch (error) {
        console.error('Error in createJobServices:', error);
        throw error;
    }
};


export const updateJobServices = async (jobId, data) => {
    try {
        const url = `job/updateJob/${jobId}`;
        const response = await axiosInstance.put(url, data);  // Use axiosInstance to send PUT request
        return response;  // Return full response for further handling
    } catch (error) {
        console.error('Error in updateJobServices:', error.message || error);
        throw error;  // Rethrow the error to propagate it to the calling function
    }
};


export const uploadJobImagesServices = async (formData) => {
    try {
        const response = await axiosInstance.post('job/uploadJobFiles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response;
    } catch (error) {
        console.error('Error in uploadJobImagesServices:', error);
        throw error;
    }
};
export const updateJobImagesServices = async (jobId, formData) => {
    try {
        const url = `job/updatejobimages/${jobId}`
        const response = await axiosInstance.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response;
    } catch (error) {
        console.error('Error in updateJobImagesServices:', error);
        throw error;
    }
};