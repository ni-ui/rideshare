import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api/ApiService";

export const bookRide = createAsyncThunk(
    'RiderThunk/BookRide',
    async (payload) => {
        const response = await API.post('/bookings/book-a-ride',payload);
        return await response;
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
        const response = await API.get('/bookings/get-my-bookings');
        return await response;
    }
)