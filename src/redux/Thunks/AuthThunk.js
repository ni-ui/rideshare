import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api/ApiService";

export const loginUser = createAsyncThunk(
    'AuthThunk/LoginUser',
    async (payload) => {
     const response = await API.post('/auth', payload);
        return await response;
    }
)

export const registerUser = createAsyncThunk(
    'AuthThunk/RegisterUser',
    async (payload) => {
     const response = await API.post('/users', payload);
        return await response;
    }
)

export const getMe = createAsyncThunk(
    'AuthThunk/GetMe',
    async () => {
     const response = await API.get('/users/me');
        return await response;
    }
)
