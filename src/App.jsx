import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';

// Route Guard to protect customer and restaurant dashboards
function ProtectedRoute({ children, allowedRole }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const savedUserStr = localStorage.getItem('registeredUser');
  
  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && savedUserStr) {
    try {
      const parsedUser = JSON.parse(savedUserStr);
      if (parsedUser.role !== allowedRole) {
        // If logged in but role mismatch, redirect to landing page
        return <Navigate to="/" replace />;
      }
    } catch (e) {
      console.error("Error parsing user data in ProtectedRoute", e);
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/customer-dashboard" 
          element={
            <ProtectedRoute allowedRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/restaurant-dashboard" 
          element={
            <ProtectedRoute allowedRole="restaurant">
              <RestaurantDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
