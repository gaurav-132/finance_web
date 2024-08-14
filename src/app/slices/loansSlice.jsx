import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../services/getData';
// await getData('/api/loans/all');
export const fetchAllLoans = createAsyncThunk('loans/fetchAllLoans', async () => {
    const response = [ { id: 1, name: 'John Doe', mobnumber: '1234567890', location: 'Haridwar', agent: 'Raghav', amount: 10000, pendingAmount: 2000 },
        { id: 2, name: 'Jane Doe', mobnumber: '0987654321', location: 'Roorkee', agent: 'Raju', amount: 15000, pendingAmount: 5000 },
        { id: 3, name: 'Bob Smith', mobnumber: '1234509876', location: 'Bhagwanpur', agent: 'Kamlesh', amount: 12000, pendingAmount: 3000 },
    ]
    console.log(response);
    return response;
});

const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
        status: 'idle',
        error: null,
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
        });
    },
});

export default loansSlice.reducer;
