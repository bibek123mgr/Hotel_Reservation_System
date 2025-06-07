import { Routes, Route } from "react-router-dom";
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

function App() {
  const hostname = window.location.hostname;
  const isDiscover = hostname === "discover.localhost";

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
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/room-details" element={<RoomDetails />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
