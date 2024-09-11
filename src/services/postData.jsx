import api from "./index"; 

export const postData = async (url, data, dispatch) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
