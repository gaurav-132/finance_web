import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../services/getData";

export const fetchDashboardData = createAsyncThunk(
    'dashboard/fetchDashboardData',
    async(thunkAPI)=>{
        try {
            const response = await getData("/v1/dashboard/dashboard-data")
            // const mockData = {
            //     totalCollectionToday: 50000, // Rs. 50,000 collected today
            //     totalLoans: 120,             // 120 active loans
            //     totalLoanAmount: 1000000,    // Rs. 10,00,000 total loan amount
            //     totalPendingAmount: 200000,  // Rs. 2,00,000 pending amount
            //     totalNewLoans: 15,           // 15 new loans today
            //     topLocations: [
            //       { location: "New York", count: 30 },
            //       { location: "Los Angeles", count: 25 },
            //       { location: "Chicago", count: 20 },
            //     ]
            //   };
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const dashboardSlice = createSlice({
    name:"dashboard",
    initialState:{
        totalCollectionToday:0,
        totalLoans:0,
        totalLoanAmount:0,
        totalPendingAmount:0,
        totalNewLoans:0,
        topLocations:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchDashboardData.pending,(state)=>{
            state.status = "loading";
        })
        .addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.totalCollectionToday = action.payload.totalCollectionToday;
            state.totalLoans = action.payload.totalLoans;
            state.totalLoanAmount = action.payload.totalLoanAmount;
            state.totalPendingAmount = action.payload.totalPendingAmount;
            state.totalNewLoans = action.payload.totalNewLoans;
            state.topLocations = action.payload.topLocations;
          })
          .addCase(fetchDashboardData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
    }
});
export default dashboardSlice.reducer;