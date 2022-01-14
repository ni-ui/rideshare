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

// export const cancelRide = createAsyncThunk(
//     'RiderThunk/CancelRide',
//     async (payload, {rejectWithValue}) => {
//         try{
//             const response = await API.post('/rides/book-a-ride', payload)
//             return response;
//         }
//         catch (e){
//             return rejectWithValue(e.response.data);
//         }  
//     }
// )

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
