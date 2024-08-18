import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import loansReducer from "./slices/loansSlice";
import employeesReducer from './slices/employeeSlice';
import usersReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loans:loansReducer,
        employees: employeesReducer,
        users :usersReducer,
    }
});

export default store;