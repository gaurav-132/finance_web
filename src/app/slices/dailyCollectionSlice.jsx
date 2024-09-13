import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDailyCollections = createAsyncThunk(
    'dailyCollections/fetchDailyCollections',
    async (filterData, thunkAPI) => {
        try {
            const response = {
                data: [
                    {
                        id: 1,
                        name: 'John Doe',
                        location: 'New York',
                        amountCollected: 1500,
                        newLoans: 3,
                        expenses: 500,
                        balance: 1000,
                    },
                    {
                        id: 2,
                        name: 'Jane Smith',
                        location: 'Los Angeles',
                        amountCollected: 2000,
                        newLoans: 5,
                        expenses: 600,
                        balance: 1400,
                    },
                    {
                        id: 3,
                        name: 'Robert Johnson',
                        location: 'Chicago',
                        amountCollected: 1800,
                        newLoans: 4,
                        expenses: 400,
                        balance: 1400,
                    },
                    {
                        id: 4,
                        name: 'Emily Davis',
                        location: 'Houston',
                        amountCollected: 2200,
                        newLoans: 6,
                        expenses: 700,
                        balance: 1500,
                    },
                    {
                        id: 5,
                        name: 'Michael Brown',
                        location: 'Phoenix',
                        amountCollected: 1700,
                        newLoans: 2,
                        expenses: 300,
                        balance: 1400,
                    },
                ]
            };
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const dailyCollectionSlice = createSlice({
    name: 'dailyCollections',
    initialState: {
        collections: [], 
        status: 'idle',
        error: null,
        total: 0,
        page: 1,
        limit: 10,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDailyCollections.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDailyCollections.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.collections = action.payload; 
                state.total = action.payload.length; 
            })
            .addCase(fetchDailyCollections.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dailyCollectionSlice.reducer;
