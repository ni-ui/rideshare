import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, forgotPassword } from '../Thunks/AuthThunk';

const initialState = {
  isInitialised: false,
  user: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: { 
    setUser :  (state, action) =>{
      state.user=action.payload;
      state.isInitialised=true;
    },
    setInitialised : (state,action) =>{
      state.isInitialised = action.payload;
    },
    logOut : (state,action) =>{
      state.user=null;
      localStorage.removeItem("carpool-auth-token")
    } 
  },
  extraReducers: (builder)=>{
    builder.addCase(loginUser.fulfilled, (state, action)=>{
      state.user = action.payload.data.user;
    }).addCase(registerUser.rejected, (action)=>{
      console.log("register rejected: ", action)
    })
    .addCase(forgotPassword.fulfilled, (state, action)=>{
      console.log("request fulfilled: ", action.payload)
    })
    .addCase(forgotPassword.rejected, (action)=>{
      console.log("request rejected: ", action)
    })
  }
})

// Action creators are generated for each case reducer function
export const { setUser, setInitialised, logOut } = appSlice.actions

export default appSlice.reducer