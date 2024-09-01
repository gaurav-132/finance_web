import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../services/getData';
import { postData } from '../../services/postData';

export const fetchAllLocations = createAsyncThunk(
    'locations/fetchAllLocations',
    async (filterData,thunkAPI) => {
        try {
            const response = await postData('/v1/locations/get-locations', filterData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createOrUpdateLocation = createAsyncThunk(
    'locations/createOrUpdateLocation',
    async (locationData, thunkAPI) => {
        try {
            console.log(locationData);
            const response = await postData('/v1/locations/add-location', locationData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const locationSlice = createSlice({
    name: 'locations',
    initialState: {
        locations:[],
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
        .addCase(fetchAllLocations.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllLocations.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.locations = action.payload.locations;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.limit = action.payload.limit;
        })
        .addCase(fetchAllLocations.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createOrUpdateLocation.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createOrUpdateLocation.fulfilled, (state) => {
            state.status = 'succeeded';
        })
        .addCase(createOrUpdateLocation.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });

    },
});

export default locationSlice.reducer;