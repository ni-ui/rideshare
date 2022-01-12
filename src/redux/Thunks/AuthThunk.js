import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api/ApiService";

export const loginUser = createAsyncThunk(
    'AuthThunk/LoginUser',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/auth', payload);
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data)
        }
    
    }
)

export const registerUser = createAsyncThunk(
    'AuthThunk/RegisterUser',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/users', payload)
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data)
        }
    
    }
)

export const getMe = createAsyncThunk(
    'AuthThunk/GetMe',
    async () => {
     const response = await API.get('/users/me');
        return await response;
    }
)
