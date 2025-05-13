// src/pages/admin/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin" && pass === "@Sam6uel") {
      localStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e7dfd7]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm text-center">
        {/* Logo */}
        <img
          src="/images/steve_logo.png"
          alt="Steve's Logo"
          className="h-20 w-auto mx-auto mb-6"
        />

        <h2 className="text-3xl font-bold mb-6 text-[#4B3621]">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full px-4 py-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#4B3621] hover:bg-[#3a2b1a] text-white font-semibold py-3 rounded-full transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
