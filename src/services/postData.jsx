import api from './index';
import { logout } from '../app/slices/authSlice';



export const postData = async (url, data, dispatch) => {

    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.message === 'token_expired') {
            dispatch(logout());
            
        } else {
            throw new Error(error.response ? error.response.data : error.message);
        }
        throw new Error(error.response ? error.response.data : error.message);
    }
};
