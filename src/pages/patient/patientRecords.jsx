import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patient records
   const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
   const fetchPatientRecords = async () => {
      try {
          const response = await axios.get(`${apiUrl}/patient/${decoded.email }`, {
            headers: {
              Authorization: `${token}`,
            },
          })
        const data = await response.data
        setPatients(data) 
      } catch (error) {
        console.log(error)
      }     
    };
  useEffect(() => {
    fetchPatientRecords()
  }, []);

  return (
    <div className="font-poppins p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">Patient Records</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
        patients.length <=0 ? (<p>Not Found</p>):
      (  patients.map(patient => (
          <div key={patient._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p className="text-gray-700"><strong>Issue:</strong> {patient.issue}</p>
            <p className="text-gray-600"><strong>Note:</strong> {patient.note || "No notes added"}</p>

            <div className="mt-4 bg-gray-100 p-3 rounded-md">
              <h4 className="text-lg font-semibold">Vitals</h4>
              <p className="text-gray-700"><strong>Blood Pressure:</strong> {patient.bloodPressure || "N/A"}</p>
              <p className="text-gray-700"><strong>Heart Rate:</strong> {patient.heartRate || "N/A"}</p>
              <p className="text-gray-700"><strong>Temperature:</strong> {patient.temperature || "N/A"}</p>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default PatientRecords;
