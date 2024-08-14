import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../services/getData';


export const fetchAllEmployees = createAsyncThunk(
    'employees/fetchAllEmployees',
    async (thunkAPI) => {
        try {
            const response = await getData('/v1/employees/get-employees');;
            return response.data.employees;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllEmployees.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllEmployees.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.employees = action.payload;
        })
        .addCase(fetchAllEmployees.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default employeesSlice.reducer;
