import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import Home from './pages/common/home'
import VerifyEmail from './pages/Auth/verify-email'
import Admin from './pages/admin/admin'
import AdminDashboard from './pages/admin/dashboard'
import ManageUsers from './pages/admin/ManageUsers'
import ProtectedRoute from './pages/admin/protectAdmin'
import Doctor from './pages/doctor/doctor'
import ManageAppointments from './pages/doctor/manage-appointments'
import Patient from './pages/patient/patient'
import MakeAppointment from './pages/patient/make-appointment'
import ProtectDoctor from './pages/doctor/protectDoctor'
import ProtectPatient from './pages/patient/protectPatient'
import PatientDetais from './pages/doctor/patient-records'
import Nurse from './pages/nurse/nurse'
import NurseDashboard from './pages/nurse/NurseDashboard'
import AppointmentStatus from './pages/patient/appointmentStatus'
import PatientRecords from './pages/patient/patientRecords'
import ProtectNurse from './pages/nurse/protectNurse'



function App() {
  
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/verify-email/:token' element={<VerifyEmail/>}/>
      <Route path='/admin' element={<ProtectedRoute component={<Admin/>}/>}>
        <Route index element={<AdminDashboard/>}/>
        <Route path='manage-users' element={<ManageUsers/>}/>
      </Route>
      <Route path='/doctor' element={<ProtectDoctor component={<Doctor/>}/>}>
       <Route index element={<ManageAppointments/>}/>
       <Route path='patient-records' element={<PatientDetais/>}/>
      </Route>
      <Route path='/patient' element={<ProtectPatient component={<Patient/>}/>}>
      <Route index element={<MakeAppointment/>}/>
      <Route path='appointment-status' element={<AppointmentStatus/>}/>
      <Route path='patient-records' element={<PatientRecords/>}/>
      </Route>
      <Route path='/nurse' element={<ProtectNurse component={<Nurse/>}/>}>
      <Route index element={<NurseDashboard/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
