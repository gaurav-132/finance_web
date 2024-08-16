import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../services/getData';
import { postData } from '../../services/postData';


export const fetchAllEmployees = createAsyncThunk(
    'employees/fetchAllEmployees',
    async (filterData,thunkAPI) => {
        try {
            const response = await postData('/v1/employees/get-employees', filterData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (formData,thunkAPI) => {
        try {
            const response = await postData('/v1/employees/update-details', formData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);




const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees:[],
        status: 'idle',
        error: null,
        updateResponse: null,
        total:0,
        page:1,
        limit:10,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllEmployees.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllEmployees.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.employees = action.payload.employees;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
        })
        .addCase(fetchAllEmployees.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(updateEmployee.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.updateResponse = action.payload.message;
        })
        .addCase(updateEmployee.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

    },
});

export default employeesSlice.reducer;
