import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const sampleTransactions = [
    {
        id: 1,
        name: 'John Doe',
        location: 'New York',
        date: '2024-09-24',
        amount: 1200,
        transactionType: 'Loan Payment',
    },
    {
        id: 2,
        name: 'Jane Smith',
        location: 'California',
        date: '2024-09-23',
        amount: 1500,
        transactionType: 'New Loan',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        location: 'Texas',
        date: '2024-09-22',
        amount: 500,
        transactionType: 'Loan Payment',
    },
    {
        id: 4,
        name: 'Alice Williams',
        location: 'Florida',
        date: '2024-09-21',
        amount: 800,
        transactionType: 'Expense',
    },
];

const mockApiFetchTransactions = (filterData) => {
    const filteredTransactions = sampleTransactions; 
    return {
        data: filteredTransactions,
        total: filteredTransactions.length,
        page: filterData.page || 1,
        limit: filterData.limit || 10,
    };
};

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (filterData, { rejectWithValue }) => {
        try {
            
            const response = mockApiFetchTransactions(filterData);
            return response; 
        } catch (error) {
            return rejectWithValue('Failed to fetch transactions.');
        }
    }
);

const initialState = {
    transactions: [],
    total: 0,
    page: 1,
    limit: 10,
    status: 'idle',
    error: null,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        resetTransactions: (state) => {
            state.transactions = [];
            state.total = 0;
            state.page = 1;
            state.limit = 10;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload.data;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
