import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/admin/dashboard" className="flex items-center space-x-3">
          <img
            src="/images/steve_logo.png"
            alt="Steve's Logo"
            className="h-10 w-auto"
          />
        
        </Link>
        {/* Mobile Menu Button */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
          <Link to="/admin/dashboard" className="flex items-center gap-1 hover:text-[#4B3621] transition">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/quotes" className="flex items-center gap-1 hover:text-[#4B3621] transition">
            <FileText size={18} /> Estimates
          </Link>
          <Link to="/admin/pricing" className="flex items-center gap-1 hover:text-[#4B3621] transition">
            <Settings size={18} /> Pricing
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40">
          <div className="flex flex-col px-6 py-4 space-y-4 text-gray-800 font-medium animate-slide-down">
            <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-[#4B3621]">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/admin/quotes" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-[#4B3621]">
              <FileText size={18} /> Estimates
            </Link>
            <Link to="/admin/pricing" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-[#4B3621]">
              <Settings size={18} /> Pricing
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 text-left text-red-600"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
