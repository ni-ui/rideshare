import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api/ApiService";


export const bookRide = createAsyncThunk(
    'RiderThunk/BookRide',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/bookings/book-a-ride', payload)
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data);
        }
    
    }
)

export const getRides = createAsyncThunk(
    'RiderThunk/GetRides',
    async () => {
        const response = await API.get('/rides');
        return await response;
    }
)

export const getBookings = createAsyncThunk(
    'RiderThunk/GetBookings',
    async () => {
        try{
            const response = await API.get('/bookings/get-my-bookings')
            return response;
        }
        catch (e){
            return e.response.data;
        }
    
    }
)
export const getMyRides = createAsyncThunk(
    'RiderThunk/GetMyRides',
    async () => {
        try{
            const response = await API.get('/rides/get-my-bookings-rides')
            return response;
        }
        catch (e){
            return e.response.data;
        }
    
    }
)

export const cancelBooking = createAsyncThunk(
    'RiderThunk/CancelBooking',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await API.post('/bookings/cancel-booking',payload)
            return response;
        }
        catch (e){
            return rejectWithValue(e.response.data);
        }
    
    }
)
