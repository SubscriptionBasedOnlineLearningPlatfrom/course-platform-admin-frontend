import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ViewPayment from "./pages/ViewPayment";
import CourseManagement from "./pages/CourseManagement";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
      <div className="App">
        {/* Show navbar only when logged in */}
        {sessionStorage.getItem("adminToken") && <Navbar />}

        <Routes>
          {/* Root route - redirect based on authentication */}
          <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute>
                <CourseManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-payment"
            element={
              <ProtectedRoute>
                <ViewPayment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
  );
}

export default App;
