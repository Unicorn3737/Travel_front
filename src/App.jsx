import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./pages/NotFound";
import { DrivePage } from "./pages/DrivePage";
import Navbar from "./components/Navbar";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { AllDrivesPage } from "./pages/AllDrivesPage";
import { EditDrive } from "./pages/EditDrive";
import { DetailsDrive } from "./pages/DetailsDrive";
import { API_URL } from "./config/config";

function App() {
  return (
    <>
      <Navbar />
      <h1>Life is Travel</h1>

      <Routes>
        <Route path="/" element={<SignupPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/drive" element={<DrivePage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-drives"
          element={
            <PrivateRoute>
              <AllDrivesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-drive/:driveId"
          element={
            <PrivateRoute>
              <EditDrive />
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:driveId"
          element={
            <PrivateRoute>
              <DetailsDrive />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
