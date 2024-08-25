import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import loansReducer from "./slices/loansSlice";
import employeesReducer from './slices/employeeSlice';
import usersReducer from './slices/userSlice';
import customersReducer from './slices/customerSlice';
import locationReducer from './slices/locationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loans:loansReducer,
        employees: employeesReducer,
        users :usersReducer,
        customers: customersReducer,
        locations: locationReducer
    }
});

export default store;