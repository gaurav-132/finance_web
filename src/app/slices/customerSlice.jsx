import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../services/postData";



export const fetchAllCustomers = createAsyncThunk(
    'customers/fetchAllCustomers',
    async (filterData, thunkAPI) => {
        try{
            const response = await postData('/v1/customers/get-customers', filterData);
            return response.data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

);



const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers:[],
        status:'idle',
        error:null,
        total:0,
        page:1,
        limit:10
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCustomers.pending, (state) => {
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
    }
});


export default customerSlice.reducer;