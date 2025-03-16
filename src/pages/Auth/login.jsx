import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Logo from "../../component/logo";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
     const response =  await axios.post(`${apiUrl}/login`, formData);
     const token  = await response.data.token
     localStorage.setItem('token',token)
     const decode = jwtDecode(token)
     const role = decode.role
     switch (role) {
      case "admin":
        navigate('/admin')
        break;
      case "Doctor":
        navigate('/doctor')
        break;
      case "Nurse":
         navigate('/nurse')
        break;
      case "Receptionist":
          navigate('/receptionist')
         break;
      case "Patient":
          navigate('/patient')
         break;
      default:
        navigate('/')
    }
    } catch (err) {
      setError(err.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-white">
       <Logo/>
      <div className="w-full mb-5 max-w-sm mt-5 max-md:w-11/12 rounded p-6 bg-gradient-to-t from-sky-400 to-blue-600 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Login
        </h2>
        {error && <p className="mb-4 text-center font-bold text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4  flex-col items-center">
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
          <button
            type="submit"
            className="w-full rounded bg-primary-color p-2 text-white bg-blue-800  disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
        <p className=" text-center text-gray-200">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-color hover:underline">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
