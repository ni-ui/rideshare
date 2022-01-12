import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api/ApiService";


export const changePassword = createAsyncThunk(
    'UpdateThunk/ChangePassword',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/users/change-password', payload)
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data);
        }
    
    }
)

export const editProfile = createAsyncThunk(
    'UpdateThunk/EditProfile',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.patch(`/users/${payload.id}`,payload.payload)
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data);
        }
    
    }
)