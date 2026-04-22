import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setIsAuth }) {
  const [course, setCourse] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const updateCourse = async () => {
    try {
      await API.put("/update-course", { course });
      alert("Course updated");
    } catch {
      alert("Error updating course");
    }
  };

  const updatePassword = async () => {
    try {
      await API.put("/update-password", {
        oldPassword,
        newPassword,
      });
      alert("Password updated");
    } catch {
      alert("Error updating password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <h1 className="text-xl font-bold">Student Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">

        {/* Update Course */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4 text-lg">Update Course</h2>
          <input
            className="border p-2 w-full rounded mb-3"
            placeholder="New Course"
            onChange={(e) => setCourse(e.target.value)}
          />
          <button
            onClick={updateCourse}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Update Course
          </button>
        </div>

        {/* Update Password */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4 text-lg">Update Password</h2>

          <input
            type="password"
            className="border p-2 w-full rounded mb-3"
            placeholder="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            className="border p-2 w-full rounded mb-3"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            onClick={updatePassword}
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}