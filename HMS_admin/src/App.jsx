import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import AdminLayout from './components/layout/admin-layout';
import Reservations from './pages/reservations';
import ReservationDetails from './pages/reservation-details';
import Rooms from './pages/rooms';
import Settings from './pages/setting';
import Guests from './pages/guests';
import Auth from './pages/auth/Auth';
import { useDispatch } from 'react-redux';
import { getHotelProfile, getUserProfile } from './app/features/auth/authSlice';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem('access-token');
    const role = localStorage.getItem('role');
    return !!token && !!role;
  };

  const RequireAuth = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      const role = localStorage.getItem('role');
      dispatch(getUserProfile({ navigate }));
    }
  }, [dispatch, navigate]);


  const PreventAuthAccess = ({ children }) => {
    if (isAuthenticated()) {
      return <Navigate to={location.state?.from || "/dashboard"} replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PreventAuthAccess>
            <Auth />
          </PreventAuthAccess>
        }
      />

      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/:id" element={<ReservationDetails />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
