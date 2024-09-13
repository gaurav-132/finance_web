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


const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        status: 'idle',
        error: null,
        total: 0,
        page: 1,
        limit: 10,
        createStatus: 'idle', // For create customer status
        createError: null,    // For create customer error
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all customers
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

            // Create customer
            .addCase(createCustomer.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.customers.push(action.payload.customer); // Add the newly created customer to the list
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload || action.error.message;
            });
    }
});

export default customerSlice.reducer;
