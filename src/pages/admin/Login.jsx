// src/pages/admin/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace this with proper login validation or use Supabase Auth
    if (email === "admin" && pass === "@Sam6uel") {
      localStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#4B3621]">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full border p-2 mb-6 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#4B3621] hover:bg-[#3a2b1a] text-white p-2 rounded-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
