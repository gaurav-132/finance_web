import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../services/getData';
import { postData } from '../../services/postData';

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async (filterData, thunkAPI) => {
        try {
            const response =
            {
                data: {
                    users: [
                        { id: 1, firstName: 'Alice', lastName: 'Johnson', mobile: '123-456-7890', isAdmin: true, isActive: true },
                        { id: 2, firstName: 'Bob', lastName: 'Smith', mobile: '098-765-4321', isAdmin: false, isActive: true },
                        { id: 3, firstName: 'Charlie', lastName: 'Brown', mobile: '111-222-3333', isAdmin: false, isActive: false },
                        
                    ],
                    count: 3, // Total number of users
                    page: filterData.page,
                    limit: filterData.limit,
                }
            }  || await postData('/v1/users/get-users', filterData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (formData, thunkAPI) => {
        try {
            const response = await postData('/v1/users/update-details', formData);
            console.log(response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null,
        updateResponse: null,
        total: 0,
        page: 1,
        limit: 10,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload.users;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(updateUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.updateResponse = action.payload.message;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });

    },
});

export default usersSlice.reducer;
