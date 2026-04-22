import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", course: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/register", form);
      alert("Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      if (err.response?.data?.message === "Email already exists") {
        alert("⚠️ Already registered! Please login.");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <input className="border p-2 w-full rounded mb-2" placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})} />

        <input className="border p-2 w-full rounded mb-2" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input type="password" className="border p-2 w-full rounded mb-2" placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})} />

        <input className="border p-2 w-full rounded mb-2" placeholder="Course"
          onChange={(e)=>setForm({...form,course:e.target.value})} />

        <button className="bg-blue-500 text-white w-full py-2 rounded">
          Register
        </button>

        {/* 👇 Login link */}
        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}