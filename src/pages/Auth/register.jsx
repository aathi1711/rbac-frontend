import { useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../component/logo";

const Register = () => {
 const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "pending", // Default role
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
     const response =  await axios.post(`${apiUrl}/register`, formData);
     const data = await response.data
     console.log(data)
    navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full   items-center justify-center bg-cover bg-[url('https://i.pinimg.com/736x/89/01/7c/89017cd7b1b2e4c5fbfd214253cb08be.jpg')]">
        <Logo/>
      <div className="w-full mb-5 max-w-sm mt-5 max-md:w-11/12 rounded bg-white p-6 bg-gradient-to-t from-sky-400 to-blue-600 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Sign Up
        </h2>
        {error && <p className="mb-4 text-center font-bold text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div> 
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border-color p-2 text-text-color focus:outline-none"
              required
            />
          </div>
          <div>
          
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border-color p-2 text-text-color focus:outline-none"
              required
            />
          </div>
          <div>
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border-color p-2 text-text-color focus:outline-none"
              required
            />
          </div>
          <div>
            
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border-color p-2 text-text-color focus:outline-none"
              required
            />
          </div>

          {/* Role Selection (Only Admin can assign) */}
          <div>
   
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg text-sm border border-border-color p-2 text-text-color focus:outline-none"
              disabled // Only admin can set this
            >
              <option value="patient">Role will be assigned by Admin</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="receptionist">Receptionist</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-primary-color p-2 text-white bg-blue-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Signup"}
          </button>
        </form>

        <p className=" text-center text-gray-200">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-color hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
