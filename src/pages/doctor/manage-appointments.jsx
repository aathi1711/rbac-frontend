import { useState, useEffect } from "react";
import axios from "axios";

const ManageAppointments = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token')
  const [appointments, setAppointments] = useState([]);
  const [updateTrigger,setUpdateTrigger] = useState(false)
const displayAppointments = async()=>{
  try {
    const response = await axios.get(`${apiUrl}/appointment`, {
      headers: {
        Authorization: `${token}`,
      },
    })
  const data = await response.data
  const filtered = data.filter((app)=>app.status != 'Rejected')
  setAppointments(filtered) 
  } catch (error) {
    console.log(error)
  }  
    
 }
  useEffect(() => {
   displayAppointments()
  }, [updateTrigger]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${apiUrl}/appointment`, {id, status },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      
    } catch (error) {
      console.error("Error updating status:", error);
    }finally{
      setUpdateTrigger((prev)=> !prev)
    }
  };

  return (
    <div className=" mx-auto mt-16 w-full p-4">
      <h2 className="text-2xl font-semibold  mb-4">Manage Appointments</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments available.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border-b last:border-b-0 py-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{appointment.name}</h3>
                <p>{appointment.issue}</p>
                <p className="text-gray-600">
                  {appointment.date} | {appointment.time}
                </p>
                
                <p className={`text-sm font-semibold ${appointment.status === "Pending" ? "text-yellow-500" : appointment.status === "Approved" ? "text-green-500" : "text-red-500"}`}>
                  {appointment.status}
                </p>
              </div>
              <div className="space-x-2">
               {appointment.status !='Approved' && <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleStatusChange(appointment.id, "Approved")}
                >
                  Approve
                </button>}
                {appointment.status !='Approved' &&<button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleStatusChange(appointment.id, "Rejected")}
                >
                  Reject
                </button>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;
