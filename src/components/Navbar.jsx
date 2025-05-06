import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/images/logo2.png"
            alt="Steve's Logo"
            className="h-12 w-auto"
          />
          <div className="leading-tight">
            <h1 className="text-xl font-bold text-gray-800">STEVE’S</h1>
            <h2 className="text-sm font-semibold text-gray-600">Staining & Restoration</h2>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
          <Link to="/" className="hover:text-[#4B3621] transition">Home</Link>
          <Link to="/about" className="hover:text-[#4B3621] transition">About</Link>
          <Link to="/services" className="hover:text-[#4B3621] transition">Services</Link>
          <Link to="/contact" className="hover:text-[#4B3621] transition">Contact</Link>
          <Link to="/admin/dashboard" className="hover:text-[#4B3621]">Admin</Link>
          <Link
            to="/quote"
            className="bg-[#4B3621] text-white px-4 py-2 rounded-lg hover:bg-[#3a2b1a] transition text-sm font-semibold"
          >
            Get an Estimate
          </Link>
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-3 text-gray-800 font-medium shadow-md">
          <Link to="/" className="block hover:text-[#4B3621]" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:text-[#4B3621]" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" className="block hover:text-[#4B3621]" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/contact" className="block hover:text-[#4B3621]" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/admin/quotes" className="block text-sm text-gray-500 hover:underline" onClick={() => setMenuOpen(false)}>Admin Login</Link>
          <Link
            to="/quote"
            className="inline-block bg-[#4B3621] text-white px-4 py-2 rounded-lg hover:bg-[#3a2b1a] transition text-sm font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
