import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [updateTrigger,setUpdateTrigger] = useState(false)
  const roles = ["Admin", "Doctor", "Nurse", "Patient"];
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token')
  const handleApprove = async(email,role) => {
      await axios.post(`${apiUrl}/manage-user`,{email,role},{
        headers: {
          Authorization: `${token}`,
        },
       })
      setUpdateTrigger((prev)=> !prev)
  
  };
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
},[updateTrigger])
  return (
    <div className="min-h-screen bg-gray-100 mt-16 p-5">
      <h1 className="text-2xl font-semibold mb-5 text-blue-600 text-center">Manage Users</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow rounded-lg p-5 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col gap-1 max-md:items-center">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.role}</p>
              <span className={` px-3 py-1 text-sm rounded-full w-fit ${user.role == "pending" ? "bg-yellow-500  text-white" : "bg-green-500 text-white"}`}>{user.role == 'pending' ? 'Pending' : 'Approved'}</span>
            </div>
              <div className="mt-3 md:mt-0 flex flex-col md:flex-row items-center gap-3">
                <select
                  onChange={(e) => handleApprove(user.email, e.target.value)}
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-md hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role} className="hover:bg-blue-200">{role}</option>
                  ))}
                </select>
                <button
                  onClick={() =>handleApprove(user.email)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                >
                  Remove
                </button>
              </div>
          
          </div>
        ))}
      </div>
    </div>
  );
}
