import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAllEmployees = createAsyncThunk('employees/fetchAllEmployees', async () => {
  const response = [
    { id: 1, name: 'John Doe', mobnumber: '1234567890', location: 'Haridwar', totalLoans: 10, totalAmt: 50000 },
    { id: 2, name: 'Jane Doe', mobnumber: '0987654321', location: 'Roorkee', totalLoans: 8, totalAmt: 40000 },
    { id: 3, name: 'Bob Smith', mobnumber: '1234509876', location: 'Bhagwanpur', totalLoans: 12, totalAmt: 60000 },
  ];
  return response;
});

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
