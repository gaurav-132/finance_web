import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../services/postData";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, thunkAPI) => {
        try {
            const response = await postData('/v1/auth/login', userData);
            localStorage.setItem('token', response.data.token);
            return {
                isAuthenticated: true,
                token: response.data.token
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const loadAuthState = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token ? true : false;
  
    return {
        isAuthenticated,
        token
    };
};
  

const initialState = loadAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ...initialState,
        error: null,
        status: 'idle',
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
        },
        checkAuthentication: (state) => {
            const token = localStorage.getItem('token');
            state.isAuthenticated = !!token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
