import axiosInstance from "../axiosInstance";

export const getTenantQuestionServices = async (data) => {
    try {
        const response = await axiosInstance.post('question_details_for_tenant_ques', data);
        return response;
    } catch (error) {
        console.error('Error in getTenantQuestionServices:', error);
        throw error;
    }
};
export const getEditAllQuestionServices = async (data) => {
    try {
        const response = await axiosInstance.post('question_details_for_tenant_ques', data);
        return response;
    } catch (error) {
        console.error('Error in getEditAllQuestionServices:', error);
        throw error;
    }
};
export const saveAllJsonDynamicQuestionServices = async (data) => {
    try {
        const response = await axiosInstance.post('save_json_details', data);
        return response;
    } catch (error) {
        console.error('Error in saveAllJsonDynamicQuestionServices:', error);
        throw error;
    }
};