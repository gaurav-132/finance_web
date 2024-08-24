import api from './index';
import { logout } from '../app/slices/authSlice';



export const postData = async (url, data, dispatch) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        if (error && error.message === 'token_expired') {
            const userConfirmed = window.confirm("Session expired.");
            if (userConfirmed) {
                dispatch(logout());
            }
        } else {
            throw error;
        }

    }
};
