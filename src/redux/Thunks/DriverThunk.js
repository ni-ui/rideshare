import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api/ApiService";

export const createRide = createAsyncThunk(
    'DriverThunk/CreateRide',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/rides',payload);
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data);
        }  
    }
)

export const getRides = createAsyncThunk(
    'DriverThunk/GetRides',
    async () => {
        try{
            const response = await API.get('/rides/get-my-rides')
            return response;
        }
        catch (e){
            return e.response.data;
        }  
    }
)

export const cancelRide = createAsyncThunk(
        'DriverThunk/CancelRide',
        async (payload, {rejectWithValue}) => {
            try{
                const response = await API.post('/rides/cancel-ride/'+`${payload}`)
                return response;
            }
            catch (e){
                return rejectWithValue(e.response.data);
            }  
        }
)

export const startRide = createAsyncThunk(
    'DriverThunk/StartRide',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/rides/start-ride/'+`${payload}`)
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data);
        }  
    }
)

export const completeRide = createAsyncThunk(
    'DriverThunk/CompleteRide',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/rides/complete-ride/'+`${payload}`)
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data);
        }  
    }
)