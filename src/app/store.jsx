import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import loansReducer from "./slices/loansSlice";
import employeesReducer from './slices/employeeSlice';
import usersReducer from './slices/userSlice';
import customersReducer from './slices/customerSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loans:loansReducer,
        employees: employeesReducer,
        users :usersReducer,
        customers: customersReducer,
    }
});

export default store;