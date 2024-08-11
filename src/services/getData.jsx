import api from './index';

export const getData = async (url) => {
    try {
        const response = await api.get(url);
    return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};
