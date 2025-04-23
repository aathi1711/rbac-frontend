import { useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../component/logo";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <div className="font-poppins relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/hospital-bg.jpg')" }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Logo/>
          <div className="hidden md:flex items-center font-bold text-gray-500  text-sm space-x-6">
            <Link to="home" smooth={true} className="cursor-pointer hover:text-blue-800">Home</Link>
            <Link to="about" smooth={true} className="cursor-pointer hover:text-blue-800">About</Link>
            <Link to="services" smooth={true} className="cursor-pointer hover:text-blue-800">Services</Link>
            <Link to="contact" smooth={true} className="cursor-pointer hover:text-blue-800">Contact</Link>
            <button onClick={()=>navigate('/login')} className="bg-blue-700 rounded cursor-pointer text-white px-2 p-1">login</button>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white shadow-md flex flex-col items-center  p-4 space-y-4">
            <Link to="home" className="" smooth={true} onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="about" smooth={true} onClick={() => setIsOpen(false)}>About</Link>
            <Link to="services" smooth={true} onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="contact" smooth={true} onClick={() => setIsOpen(false)}>Contact</Link>
            <button onClick={()=>navigate('/login')} className="bg-blue-700 rounded cursor-pointer text-white px-2 p-1">login</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-[url('https://i.pinimg.com/736x/89/01/7c/89017cd7b1b2e4c5fbfd214253cb08be.jpg')] bg-cover h-screen flex flex-col justify-center items-center text-white text-center px-4">
        <h2 className="text-4xl md:text-6xl  font-bold">Welcome to Our Hospital</h2>
        <p className="text-lg md:text-xl mt-4 max-w-2xl ">Providing world-class healthcare with cutting-edge medical facilities and expert professionals.</p>
        <button onClick={()=>navigate('/signup')} className="mt-6 px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700 transition font-semibold">Book an Appointment</button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-bold text-blue-600">About Us</h2>
        <p className="max-w-3xl mx-auto mt-4 text-gray-700">We are a leading healthcare provider, dedicated to offering comprehensive medical care with a patient-centric approach. Our team consists of highly skilled doctors, nurses, and medical professionals committed to ensuring your well-being.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold text-blue-600">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-6">
          <div className="p-6 bg-white shadow-lg rounded-lg duration-500 hover:bg-blue-600 hover:text-white">
            <h3 className="text-xl font-semibold">Emergency Care</h3>
            <p className="mt-2 ">24/7 emergency services with rapid response and expert care.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg duration-500 hover:bg-blue-600 hover:text-white">
            <h3 className="text-xl font-semibold">Specialized Treatments</h3>
            <p className="mt-2 ">Expert medical treatments in cardiology, neurology, orthopedics, and more.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg duration-500 hover:bg-blue-600 hover:text-white">
            <h3 className="text-xl font-semibold">Diagnostic Services</h3>
            <p className="mt-2 ">State-of-the-art diagnostic equipment for accurate health assessments.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-bold text-blue-600">Contact Us</h2>
        <p className="max-w-3xl mx-auto mt-4 text-gray-700">Reach out to us for appointments and inquiries. Our team is always here to assist you.</p>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-6">
          <div className="h-24 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="mt-2 text-gray-700">+123 456 7890</p>
          </div>
          <div className="p-6 h-24 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="mt-2 text-gray-700">contact@hospital.com</p>
          </div>
          <div className="p-6 h-24 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Location</h3>
            <p className="mt-2 text-gray-700">123 Health St, Wellness City</p>
          </div>
        </div>
      </section>
    </div>
  );
}
