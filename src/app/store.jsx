import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import loansReducer from "./slices/loansSlice";
import employeesReducer from './slices/employeeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loans:loansReducer,
        employees: employeesReducer
    }
});

export default store;