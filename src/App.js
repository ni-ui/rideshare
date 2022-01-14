import './App.css';
import Login from './Components/Login/Login'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/Register/Register';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getMe } from './redux/Thunks/AuthThunk';
import API from "./services/api/ApiService";
import { setInitialised, setUser } from './redux/slices/appSlice';
import CreateRide from './Components/Dashboard/Driver/CreateRide';
import Loader from './Components/Common/Loader';
import ViewActiveRides from './Components/Dashboard/Driver/ViewActiveRides';
import ViewPastRides from './Components/Dashboard/Driver/ViewPastRides';
import BookRide from './Components/Dashboard/Rider/BookRide';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Components/Dashboard/Profile/Profile';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';
import ViewActiveBookings from './Components/Dashboard/Rider/ViewActiveBookings';
import ViewPastBookings from './Components/Dashboard/Rider/ViewPastBookings';
import DriverLandingPage from './Components/Dashboard/DriverLandingPage';
import RiderLandingPage from './Components/Dashboard/RiderLandingPage';

function App() {
  const user=useSelector((state)=>state.app.user);  
  const dispatch = useDispatch();
  const isLoading=useSelector((state)=>state.app.isInitialised);
 
  const PrivateRoute = ({children}) =>{
    const user=useSelector((state)=>state.app.user);
    return user ? children:<Navigate to="/" />

  }

  const DriverPrivateRoute = ({children}) =>{
    const user=useSelector((state)=>state.app.user);
    return user && user.userType==="Driver" ? children:<Navigate to="/" />

  }

  const RiderPrivateRoute = ({children}) =>{
    const user=useSelector((state)=>state.app.user);
    return user && user.userType==="Rider" ? children:<Navigate to="/" />

  }

  const PublicRoute = ({children}) =>{
    const user=useSelector((state)=>state.app.user);
    return user ? <Navigate to={`/dashboard/${String(user.userType).toLowerCase()}`} />:children;

  }
   
  useEffect (()=>{
    if(!user && localStorage.getItem("carpool-auth-token")){
      const token = localStorage.getItem("carpool-auth-token")
      API.defaults.headers.common["x-auth-token"] = token;
      dispatch(getMe()).then(value =>{
        if(!value.error && value.payload.status===200)
        dispatch(setUser(value.payload.data));
        else{
          localStorage.removeItem("carpool-auth-token")
          dispatch(setInitialised(true));
          dispatch(setUser(null))
        }

      })
    }

    else{
      localStorage.removeItem("carpool-auth-token")
      dispatch(setInitialised(true));
      dispatch(setUser(null))

    }
  
  },[])

  if(!isLoading)
  return <Loader />

  return (
    <div className="App">
      <div>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={
            <PublicRoute>
            <Login/>
            </PublicRoute>
           }
          />
          <Route path='/forgotpassword' element={
            <PublicRoute>
            <ForgotPassword/>
            </PublicRoute>
           }
          /> 
          <Route path='/resetPassword/' element={
            <PublicRoute>
            <ResetPassword/>
            </PublicRoute>
           }
          />          
          <Route path="/dashboard/driver"
          element={
            <DriverPrivateRoute>
              <Dashboard Page={DriverLandingPage} />
              </DriverPrivateRoute>
          } />
          <Route path="dashboard/driver/create"
          element={
            <DriverPrivateRoute>
              <Dashboard Page={CreateRide} />
              </DriverPrivateRoute>
          } />
          <Route path="dashboard/driver/viewactive"
          element={
            <DriverPrivateRoute>
              <Dashboard Page={ViewActiveRides} />
              </DriverPrivateRoute>
          } />
          <Route path="dashboard/driver/viewpast"
          element={
            <DriverPrivateRoute>
              <Dashboard Page={ViewPastRides} />
              </DriverPrivateRoute>
          } />
            <Route path="/dashboard/rider"
          element={
            <RiderPrivateRoute>
              <Dashboard Page={RiderLandingPage} />
              </RiderPrivateRoute>
          } />
          <Route path="/dashboard/rider/book"
          element={
            <RiderPrivateRoute>
              <Dashboard Page={BookRide} />
              </RiderPrivateRoute>
          } />
          <Route path="/dashboard/rider/viewactivebookings"
          element={
            <RiderPrivateRoute>
              <Dashboard Page={ViewActiveBookings} />
              </RiderPrivateRoute>
          } />
          <Route path="/dashboard/rider/viewpastbookings"
          element={
            <RiderPrivateRoute>
              <Dashboard Page={ViewPastBookings} />
              </RiderPrivateRoute>
          } />
          <Route path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Dashboard Page={Profile} />
              </PrivateRoute>
          } />
          <Route path='/signup' element={
            <PublicRoute>
            <Register/>
            </PublicRoute>
            }            
          />
        </Routes>
        <ToastContainer position="top-center"/>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
