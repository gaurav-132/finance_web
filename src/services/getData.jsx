// import api from "./index"; 

// export const getData = async (url) => {
//     try {
//         const response = await api.get(url);
//         console.log(response);
        
//     return response.data;
//     } catch (error) {
//         throw new Error(error.response ? error.response.data : error.message);
//     }
// };

import api from "./index"; 

export const getData = async (url, options = {}) => {
    try {
        // Spread the options, allowing you to pass custom Axios configurations (like responseType)
        const response = await api.get(url, { ...options });
        console.log(response);
        
        return response.data; // This will return the data as a Blob when responseType is 'blob'
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};
