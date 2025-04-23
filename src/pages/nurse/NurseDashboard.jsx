import { useEffect, useState } from "react";
import axios from "axios";

const NurseDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [vitals, setVitals] = useState({
    bloodPressure:'',
    heartRate:'',
    temperature:''
  });
  const [updateTrigger,setUpdateTrigger]= useState(false)
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
  }, [updateTrigger]);

  // Handle input changes for vitals
  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };
  // Submit vitals data
  const handleSubmit = async(e,id) => {
    e.preventDefault()
    try {
      await axios.put(`${apiUrl}/update-vitals/${id}`,vitals,
        {
          headers: { 
            Authorization: `${token}`,
          },
        }
      );
      setVitals({bloodPressure:'',heartRate:'',temperature:''})
    } catch (error) {
      console.error("Error updating status:", error);
    }finally{
      setUpdateTrigger((prev)=> !prev)
    }  
  };

  return (
    <div className="font-poppins p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">Approved Patients</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.length == 0 ? (<p>Not Found</p>):
        (patients.map(patient => (
          <div key={patient._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p className="text-gray-600"><strong>Issue:</strong> {patient.issue}</p>
            <p className="text-gray-600"><strong>Doctor Note:</strong> {patient.note || "No notes added"}</p>
            
            {/* Vitals Input */}
            <form onSubmit={(e)=>handleSubmit(e,patient.patient_id)}>
            <div className="mt-4">
              <label className="block text-sm font-medium">Blood Pressure:</label>
              <input 
                type="text" 
                name="bloodPressure"
                value={vitals.bloodPressure}
                onChange={(e)=>handleChange(e)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium">Heart Rate:</label>
              <input 
                type="text" 
                name="heartRate"
                value={vitals.heartRate}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium">Temperature:</label>
              <input 
                type="text" 
                name="temperature"
                value={vitals.temperature}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button 
               
              className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
            >
              Update Vitals
            </button>
            </form>
          </div>
        )))}
      </div>
    </div>
  );
};

export default NurseDashboard;
