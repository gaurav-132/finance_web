import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../services/postData";



export const fetchAllCustomers = createAsyncThunk(
    'customers/fetchAllCustomers',
    async (filterData, thunkAPI) => {
        try {
            const response = await postData('/v1/customers/get-customers', filterData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



export const createCustomer = createAsyncThunk(
    'customers/createCustomer',
    async (newCustomerData, thunkAPI) => {
        try {
            const response = await postData('/v1/customers/create-customer', newCustomerData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const fetchCustomerDetails = createAsyncThunk(
    'customers/fetchCustomerDetails',
    async (customerId, thunkAPI) => {
        
        try {
            // const response = await postData(`/v1/customers/get-customer/${customerId}`);
            const response = {
                data:{
                id: 1,
                firstName: "John",
                lastName: "Doe",
                mobileNumber: "9876543210",
                aadhaarNumber: "1234-5678-9012",
                panNumber: "ABCDE1234F",
                fullAddress: "123 Main St, Springfield",
                location: "New York",
                dateOfBirth: "1990-01-01",
                occupation: "Software Engineer",
                profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
                loanDetails: [
                    { loanId: 101, amount: 5000, status: "active", dueDate: "2024-12-01" },
                    { loanId: 102, amount: 3000, status: "completed", dueDate: "2023-09-15" }
                ],
            }}
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        customerDetails: null,
        status: 'idle',
        error: null,
        total: 0,
        page: 1,
        limit: 10,
        createStatus: 'idle',
        createError: null,    
        detailsStatus: 'idle',  
        detailsError: null,  
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCustomers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCustomers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.customers = action.payload.customers;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
            })
            .addCase(fetchAllCustomers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCustomer.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.customers.push(action.payload.customer); 
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload || action.error.message;
            })              
            .addCase(fetchCustomerDetails.pending, (state) => {
                state.detailsStatus = 'loading';
            })
            .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
                state.detailsStatus = 'succeeded';
                state.customerDetails = action.payload; 
            })
            .addCase(fetchCustomerDetails.rejected, (state, action) => {
                state.detailsStatus = 'failed';
                state.detailsError = action.payload || action.error.message;
            });
    
    }
});

export default customerSlice.reducer;
