import {  useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AppointmentStatus = () => {
  const [appointments, setAppointments] = useState([]);
 
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const fetchAppointments = async () => {
    try {
        const response = await axios.get(`${apiUrl}/appointment/${decoded.email}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
      const data = await response.data
      setAppointments(data) 
    } catch (error) {
      console.log(error)
    }     
  };
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-semibold text-gray-800  mb-4">Patient Records</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white shadow-lg rounded-lg p-4 border">
              <h3 className="text-lg font-semibold">{appointment.name}</h3>
              <p className="text-gray-600">📅 Date: {appointment.date}</p>
              <p className="text-gray-600">⏰ Time: {appointment.time}</p>
              <p className="text-gray-600"> Issue: {appointment.issue}</p>
              <p className={`font-semibold mt-2 ${appointment.status === "Pending" ? "text-yellow-600" : appointment.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                Status: {appointment.status}
              </p>
              {appointment.note && <p className="text-gray-600" >Note: {appointment.note}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentStatus;
