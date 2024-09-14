import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../services/getData';
import { postData } from '../../services/postData';

export const fetchAllLoans = createAsyncThunk('loans/fetchAllLoans', async () => {
    const response = [ { id: 1, name: 'John Doe', mobnumber: '1234567890', location: 'Haridwar', agent: 'Raghav', amount: 10000, pendingAmount: 2000 },
        { id: 2, name: 'Jane Doe', mobnumber: '0987654321', location: 'Roorkee', agent: 'Raju', amount: 15000, pendingAmount: 5000 },
        { id: 3, name: 'Bob Smith', mobnumber: '1234509876', location: 'Bhagwanpur', agent: 'Kamlesh', amount: 12000, pendingAmount: 3000 },
    ]
    console.log(response);
    return response;
});

export const fetchAllLoanRequests = createAsyncThunk(
    'loans/fetchLoanRequests',
    async(filterData, thunkAPI) => {
        try {
            const response = await postData('/v1/customers/get-loan-requests', filterData, thunkAPI.dispatch);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const dispatchAction = createAsyncThunk(
    'loans/dispatchAction',
    async(action, thunkAPI) => {
        try {
            const response = await postData('/v1/customers/dispatch-action', action, thunkAPI.dispatch);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchLoanDetails = createAsyncThunk(
    'loans/fetchLoanDetails',
    async (loanId,thunkAPI)=>{
       
        try {
            // const response = await getData('v1/loans/get-loan/${loanId}')
            const response = {
                data:{
                loanId: 201,
                name: "Raghav",
                totalAmount: 10000,
                collectedAmount: 6000,
                pendingAmount: 4000,
                profit: 500,  // Profit from interest or fees
                issueDate: "2023-06-01",
                dueDate: "2024-06-01",
                transactionLogs: [
                    { transactionId: 301, date: "2023-07-01", amount: 2000, status: "collected" },
                    { transactionId: 302, date: "2023-08-01", amount: 2000, status: "collected" },
                    { transactionId: 303, date: "2023-09-01", amount: 2000, status: "collected" },
                    { transactionId: 304, date: "2023-10-01", amount: 2000, status: "pending" }
                ]
            }};
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
        loanRequests:[],
        loanDetails:null,
        status: 'idle',
        limit:10,
        page:1,
        total:0,
        error: null,
        dispatchActionRes:'',
        detailsStatus: 'idle',  
        detailsError: null,  
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllLoans.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllLoans.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.loans = action.payload;
        })
        .addCase(fetchAllLoans.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchAllLoanRequests.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllLoanRequests.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.loanRequests = action.payload.loanRequests;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
        })
        .addCase(fetchAllLoanRequests.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(dispatchAction.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(dispatchAction.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.dispatchActionRes = action.payload.message;
        })
        .addCase(dispatchAction.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchLoanDetails.pending,(state)=>{
            state.detailsStatus="loading";
        })
        .addCase(fetchLoanDetails.fulfilled,(state,action)=>{
            state.detailsStatus = "succeeded";
            state.loanDetails = action.payload;
        })
        .addCase(fetchLoanDetails.rejected,(state,action)=>{
            state.detailsStatus="failed";
            state.detailsError = action.payload || action.error.message;
        })
    },
});

export default loansSlice.reducer;
