import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import loansReducer from './slices/loansSlice';
import employeesReducer from './slices/employeeSlice';
import usersReducer from './slices/userSlice';
import customersReducer from './slices/customerSlice';
import locationReducer from './slices/locationSlice';
import dashboardReducer from './slices/dashboardSlice';
import dailyCollectionsReducer from './slices/dailyCollectionSlice';
import transactionsReducer from './slices/transactionSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loans: loansReducer,
        employees: employeesReducer,
        users: usersReducer,
        customers: customersReducer,
        locations: locationReducer,
        dashboard: dashboardReducer,
        dailyCollections: dailyCollectionsReducer,
        transactions:transactionsReducer
    },
});

// Set up Axios interceptors with the store

export default store;
