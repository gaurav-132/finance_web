import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../services/getData";


export const fetchEmployeeDetails = createAsyncThunk(
    'employeeDetails/fetchEmployeeDetails',
    async(employeeId)=>{
       
        const response = 
        {
            id:`${employeeId}` ,
            name: 'John Doe',
            mobileNo: '9876543210',
            location: 'Haridwar',
            fullAddress: '123 Street, Haridwar, Uttarakhand',
            totalAmount: 30000,
            totalLoans: 40,
        } || await getData(`/api/employee/${employeeId}`)
    
      return response
    }
);

const employeeDetailSlice = createSlice({
    name:"employeeDetails",
    initialState:{
        employee:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchEmployeeDetails.pending,(state)=>{
            state.status="loading"
        }).addCase(fetchEmployeeDetails.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.employee=action.payload;
        }).addCase(fetchEmployeeDetails.rejected,(state,action)=>{
            state.status="failed",
            state.error=action.error.message;
        })
    }
})

export default employeeDetailSlice.reducer;