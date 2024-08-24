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

const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
        loanRequests:[],
        status: 'idle',
        limit:10,
        page:1,
        total:0,
        error: null,
        dispatchActionRes:'',
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
        });
    },
});

export default loansSlice.reducer;
