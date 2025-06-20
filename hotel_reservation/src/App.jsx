import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/layout";
import AppInfo from "./pages/AppInfo";
import Rooms from "./components/room/Rooms";
import RoomDetails from "./pages/room-details";
import HotelDetails from "./pages/hotel-details";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getHotelsNearLocation } from "./app/features/hotel/hotelSlice";
import HotelRegistrationForm from "./pages/hotel-registration-form";
import Hotels from "./pages/hotels";
import ReservationList from "./pages/reservation-list";
import ProfilePage from './pages/profile';
import { getUserProfile } from "./app/features/auth/authSlice";

function App() {
  const hostname = window.location.hostname;
  const isDiscover = hostname === "discover.localhost";
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem('access-token');
    return !!token;
  };

  if (isDiscover) {
    return (
      <Routes>
        <Route path="*" element={<AppInfo />} />
        <Route path="/hotelregister" element={<HotelRegistrationForm />} />
      </Routes>
    );
  }
  const dispatch = useDispatch()
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            getHotelsNearLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: 15,
            })
          );
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);


  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/room-details" element={<RoomDetails />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/my-reservation" element={<ReservationList />} />
      </Route>
    </Routes>
  );
}

export default App;
