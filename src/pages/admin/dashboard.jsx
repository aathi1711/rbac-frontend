import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const totalDoctors = users.filter((user)=>user.role == 'Doctor').length
  const totalNurse = users.filter((user)=>user.role == 'Nurse').length
  const totalReceptionist = users.filter((user)=>user.role == 'Receptionist').length
  const totalPatients = users.filter((user)=>user.role == 'Patient').length
  const token = localStorage.getItem('token')
  const apiUrl = import.meta.env.VITE_API_URL;
  const displayUsers = async()=>{  
     const response = await axios.get(`${apiUrl}/manage-user`, {
         headers: {
           Authorization: `${token}`,
         },
       })
     const data = await response.data
     setUsers(data) 
  }
  useEffect(()=>{
    displayUsers()
  },[])
  return (
    <div className="min-h-screen bg-gray-100 mt-16" >
      <div className="flex flex-wrap gap-6 justify-center p-5">
      <div className="flex flex-col items-center justify-center p-5 w-48 h-32 rounded-xl shadow-md bg-blue-500">
        <h2 className="text-xl font-semibold text-white">Doctors</h2>
        <p className="text-3xl font-bold text-white">{totalDoctors}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-5 w-48 h-32 rounded-xl shadow-md bg-blue-500">
        <h2 className="text-xl font-semibold text-white">Nurses</h2>
        <p className="text-3xl font-bold text-white">{totalNurse}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-5 w-48 h-32 rounded-xl shadow-md bg-blue-500">
        <h2 className="text-xl font-semibold text-white">Receptionists</h2>
        <p className="text-3xl font-bold text-white">{totalReceptionist}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-5 w-48 h-32 rounded-xl shadow-md bg-blue-500">
        <h2 className="text-xl font-semibold text-white">Patients</h2>
        <p className="text-3xl font-bold text-white">{totalPatients}</p>
      </div>
    </div>
    <div className="h-12 p-2 w-full shadow-md bg-white text-xl font-bold mb-5">All Users</div>
      <div className="grid grid-cols-1 pl-5 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow rounded-lg p-5 flex flex-col items-center text-center">
            <img
              src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png'
              alt={user.name}
              className="w-20 h-20 rounded-full mb-3 border-2 border-gray-300"
            />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
