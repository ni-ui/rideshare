import { createSlice } from '@reduxjs/toolkit'
import { editProfile, changePassword } from '../Thunks/UpdateThunk';

const initialState = {
}

export const riderSlice = createSlice({
  name: 'update',
  initialState,
  reducers: { 
  },
  extraReducers: (builder)=>{
    builder.addCase(editProfile.fulfilled, (state,action)=>{
      console.log("STATE")
      state.user = action.payload.data;
    }).addCase(editProfile.rejected, (action)=>{
      console.log("request rejected: ", action);
    }).addCase(changePassword.fulfilled, (state,action)=>{
        console.log("STATE")
        state.user = action.payload.data;
      }).addCase(changePassword.rejected, (action)=>{
        console.log("request rejected: ", action);
      })
  }
})

// Action creators are generated for each case reducer function
export const {} = riderSlice.actions

export default riderSlice.reducer