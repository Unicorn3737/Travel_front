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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

//const [count, setCount] = useState(0);

/* return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );*/

export default App;
