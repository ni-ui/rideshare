import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api/ApiService";

export const createRide = createAsyncThunk(
    'DriverThunk/CreateRide',
    async (payload) => {
        const response = await API.post('/rides',payload);
        return await response;
    }
)

export const getRides = createAsyncThunk(
    'DriverThunk/GetRides',
    async () => {
        const response = await API.get('/rides/get-my-rides');
        return await response;
    }
)