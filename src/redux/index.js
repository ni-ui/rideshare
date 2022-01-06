import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/appSlice'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import driverSlice from './slices/driverSlice';
import riderSlice from './slices/riderSlice';

export default configureStore({
  reducer: {
    app: appSlice,
    driver: driverSlice,
    rider: riderSlice,
  },
})