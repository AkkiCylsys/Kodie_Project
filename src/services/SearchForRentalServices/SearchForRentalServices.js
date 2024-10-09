import axiosInstance from "../axiosInstance";

export const getSearchForRentalServices = async (data) => {
    try {
        const response = await axiosInstance.post('Search_For_Rental', data);
        return response;
    } catch (error) {
        console.error('Error in getSearchForRentalServices:', error);
        throw error;
    }
};