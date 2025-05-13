// src/hooks/useAdminAuth.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAdminAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) navigate("/admin/login");
  }, [navigate]);
}
