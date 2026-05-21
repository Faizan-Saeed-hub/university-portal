import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UniversityList from "./pages/UniversityList";
import DocumentUpload from "./pages/DocumentUpload";
import MeritEligibility from "./pages/MeritEligibility";
import UniversityRecommendation from "./pages/UniversityRecommendation";
import Chatbot from "./pages/Chatbot";
import UOSPrograms from "./pages/UOSPrograms";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Users from "./admin/pages/Users";
import Universities from "./admin/pages/Universities";
import Documents from "./admin/pages/Documents";
import Recommendations from "./admin/pages/Recommendations";

import "./index.css";

// Simple ProtectedRoute component for students
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // "true" if logged in
  return isLoggedIn ? children : <Navigate to="/login" />;
}

// ProtectedRoute specifically for Admins
function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("userRole");
  
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (userRole !== "Admin") return <Navigate to="/dashboard" />; // redirect students away
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/universities"
          element={
            <ProtectedRoute>
              <UniversityList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <DocumentUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UniversityFinder"
          element={
            <ProtectedRoute>
              <UniversityRecommendation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eligibility"
          element={
            <ProtectedRoute>
              <MeritEligibility />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/university/:id/programs"
          element={
            <ProtectedRoute>
              <UOSPrograms />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/admin/universities" element={<AdminRoute><Universities /></AdminRoute>} />
        <Route path="/admin/documents" element={<AdminRoute><Documents /></AdminRoute>} />
        <Route path="/admin/recommendations" element={<AdminRoute><Recommendations /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
