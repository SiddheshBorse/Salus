import Landing from "./screens/OnBoarding/Landing";
import landingDoctor from "./assets/images/landingDoctor.svg"
import { TextField } from "@mui/material";
import MasterAccount from "./screens/OnBoarding/MasterAccount";
import Login from "./screens/OnBoarding/Login";
import Dashboard from "./screens/Application/Dashboard";
import { Outlet, Route, Routes } from 'react-router'
import DoctorUI from "./screens/Appointments/DoctorUI";
import DoctorOnboarding from "./screens/Application/DoctorOnboarding";
import StaffDisplay from "./screens/Application/StaffDisplay";

export default function App() {
  return (
    <div className= "App">
      <Routes>
        <Route path = "/" element = {<Dashboard />}/>
        <Route path = "/landing" element = {<Landing/>} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/master" element = {<MasterAccount/>}/>
        <Route path = "/doctor" element = {<DoctorUI/>}/>
        <Route path = "/onboarding" element = {<DoctorOnboarding/>}/>
        <Route path = "/staff" element = {<StaffDisplay/>}/>
        
        </Routes>
      <Outlet/>
    </div>
  )
} 