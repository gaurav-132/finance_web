import api from './index'; 

export const deleteData = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
