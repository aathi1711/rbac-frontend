import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MakeAppointment = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
     const token = localStorage.getItem('token')
     const decode = jwtDecode(token)
  const [appointment, setAppointment] = useState({
    name:"",
    email:decode.email,
    time: "",
    date: "",
    address: "",
    phone: '',
    issue: ""
  });
  const [loading,setLoading] =  useState(false)
  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await axios.post(`${apiUrl}/appointment`, appointment,{
        headers: {
          Authorization: `${token}`,
        },
      });
      setAppointment({ time: "", date: "", address: "", phone: "", issue: "",name:'' });
    } catch (error) {
      console.error("Error booking appointment:", error);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="font-poppins max-w-md mx-auto p-6 bg-white rounded-lg mt-20 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Full Name" value={appointment.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="time" name="time" value={appointment.time}  onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="date" value={appointment.date} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="address" placeholder="Address" value={appointment.address} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" value={appointment.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="issue" placeholder="Describe your issue" value={appointment.issue} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
        <button type="submit" disabled={loading} className="w-full p-2 bg-red-700 text-white disabled:opacity-50 rounded">{loading ? 'Loading...' : 'Make Appoitment'}</button>
      </form>
    </div>
  );
};

export default MakeAppointment;
