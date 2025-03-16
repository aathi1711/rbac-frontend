import { useState } from "react";
import { Menu, X, Users, LogOut,NotebookIcon, NotebookPen, HospitalIcon } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Patient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed  top-0 left-0 z-50 w-64 bg-red-700 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform md:translate-x-0 md:fixed h-screen md:flex md:w-64`}
      >
        <div className="p-5 flex justify-between md:hidden">
        
        <h1 className="text-xl font-bold text-white ">Patient</h1>
       
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <nav className="mt-5 w-full font-semibold ">
        <div className=" p-3 max-md:hidden">
        <h1 className="text-3xl font-bold text-white ">Patient</h1>
        </div>
          <Link to='/patient' className="flex items-center p-3 text-white hover:bg-red-800">
            <NotebookPen className="w-5 h-5 mr-3" /> Make an Appointment
          </Link>
          <Link to='/patient/appointment-status' className="flex items-center p-3 text-white hover:bg-red-800">
            <NotebookIcon className="w-5 h-5 mr-3" />Appointment Status
          </Link>
          <Link to='/patient/patient-records' className="flex items-center p-3 text-white hover:bg-red-800">
            <Users className="w-5 h-5 mr-3" />Patient Records
          </Link>
          <button onClick={logout} className="flex items-center w-full p-3 text-white hover:bg-red-800">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5 bg-white fixed top-0 w-full  shadow flex justify-between items-center">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex gap-1 items-center font-bold text-red-800 ">
        <HospitalIcon/>
        <h1 className="text-xl ">WeHealth</h1>
        </div>
        </div>
        <Outlet/>
      </div>
    </div>
  );
}
