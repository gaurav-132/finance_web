import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import loansReducer from "./slices/loansSlice";
import employeesReducer from './slices/employeeSlice';
import usersReducer from './slices/userSlice';
import employeeDetailReducer from './slices/employeeDetailSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loans:loansReducer,
        employees: employeesReducer,
        users :usersReducer,
        employeedetail:employeeDetailReducer
    }
});

export default store;