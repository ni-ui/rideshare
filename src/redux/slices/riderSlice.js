import { createSlice } from '@reduxjs/toolkit'
import { getRides, getBookings} from '../Thunks/RiderThunk';

const initialState = {
  rides: null,
  bookings: null,
}

export const riderSlice = createSlice({
  name: 'rider',
  initialState,
  reducers: { 
  },
  extraReducers: (builder)=>{
    builder.addCase(getRides.fulfilled, (state, action)=>{
      state.rides = action.payload.data;
    }).addCase(getRides.rejected, (action)=>{
      console.log("request rejected: ", action)
    }).addCase(getBookings.fulfilled, (state,action)=>{
      state.bookings = action.payload.data;
    }).addCase(getBookings.rejected, (action)=>{
      console.log("request rejected: ", action);
    })
  }
})

// Action creators are generated for each case reducer function
export const {} = riderSlice.actions

export default riderSlice.reducer