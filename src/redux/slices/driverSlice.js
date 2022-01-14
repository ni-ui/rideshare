import { createSlice } from '@reduxjs/toolkit'
import { getRides, cancelRide, completeRide, startRide } from '../Thunks/DriverThunk';

const initialState = {
  rides: null
}

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: { 
  },
  extraReducers: (builder)=>{
    builder.addCase(getRides.fulfilled, (state, action)=>{
      state.rides = action.payload.data;
    }).addCase(getRides.rejected, (state, action)=>{
      console.log("request rejected: ", action)
    }).addCase(cancelRide.fulfilled, (state, action)=>{
      state.rides = action.payload.data;
    }).addCase(cancelRide.rejected, (state, action)=>{
      console.log("request rejected: ", action)
    }).addCase(startRide.fulfilled, (state, action)=>{
      state.rides = action.payload.data;
    }).addCase(startRide.rejected, (state, action)=>{
      console.log("request rejected: ", action)
    }).addCase(completeRide.fulfilled, (state, action)=>{
      state.rides = action.payload.data;
    }).addCase(completeRide.rejected, (state, action)=>{
      console.log("request rejected: ", action)
    })
  }
})

// Action creators are generated for each case reducer function
export const {} = driverSlice.actions

export default driverSlice.reducer