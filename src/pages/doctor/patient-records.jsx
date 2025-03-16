import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientDetais = () => {
  const [patients, setPatients] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token')
  const displaypatients = async()=>{
    try {
      const response = await axios.get(`${apiUrl}/patient`, {
        headers: {
        Authorization: `${token}`,
        },
      })
    const data = await response.data
    const filtered = data.filter((app)=>app.status == 'Approved')
    setPatients(filtered) 
    } catch (error) {
      console.log(error)
    }   
   }
  useEffect(() => {
    displaypatients()
  }, []);

  const handleAddNote = async(id, note) => {
    try {
        await axios.put(`${apiUrl}/add-note`, {id, note},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        ); 
      } catch (error) {
        console.error( error);
      }
  };

  return (
    <div className="p-5 mt-20">
      <h2 className="text-xl font-bold mb-4">Patient Records</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
        patients.length <=0 ? (<p>Records Not Found</p>) :
        (patients.map((appointment) => (
          <div key={appointment._id} className="border p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{appointment.name}</h3>
            <p><strong>Issue:</strong> {appointment.issue}</p>
            <p><strong>Blood Pressure:</strong> {appointment.bloodPressure ? appointment.bloodPressure : 'Not Mentioned'}</p>
            <p><strong>Heart Rate:</strong> {appointment.heartRate ? appointment.heartRate : 'Not Mentioned'}</p>
            <p><strong>Temperature:</strong> {appointment.temperature ? appointment.temperature : 'Not Mentioned'}</p>
    
            {/* Notes Section */}
            <textarea
              placeholder="Add medical notes..."
              className="w-full border rounded p-2 my-2"
              onBlur={(e) => handleAddNote(appointment.patient_id, e.target.value)}
            />
          </div>
        )))}
      </div>
    </div>
  );
};

export default PatientDetais;
