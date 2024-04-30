import Landing from "./screens/OnBoarding/Landing";
import MasterAccount from "./screens/OnBoarding/MasterAccount";
import Login from "./screens/OnBoarding/Login";
import Dashboard from "./screens/Application/Dashboard";
import { Outlet, Route, Routes } from "react-router";
import DoctorUI from "./screens/Appointments/DoctorUI";
import DoctorOnboarding from "./screens/Application/DoctorOnboarding";
import StaffDisplay from "./screens/Application/StaffDisplay";
import Home from "./screens/Application/Home";
import Reception from "./screens/Application/Reception";
import WardsAndBeds from "./screens/Application/WardsAndBeds";
import WardDetails from "./screens/Application/WardDetails";
import Settings from "./screens/Application/Settings";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="doctorUI" element={<DoctorUI />} />
          <Route path="doctorOnboarding" element={<DoctorOnboarding />} />
          <Route path="staffDisplay" element={<StaffDisplay />} />
          <Route path="reception" element={<Reception />} />
          <Route path="wardsDisplay" element={<WardsAndBeds />} />
          <Route path="wardsDetails" element={<WardDetails />} />
          <Route path="settings" element={<Settings/>} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/master" element={<MasterAccount />} />
      </Routes>
      <Outlet />
    </div>
  );
}
