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
            src="/images/steve_logo.png"
            alt="Steve's Logo"
            className="h-12 w-auto"
          />
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
          <Link
            to="/quote"
            className="bg-[#4B3621] text-white px-4 py-2 rounded-full hover:bg-[#3a2b1a] transition text-sm font-semibold"
          >
            Get an Estimate
          </Link>
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40">
          <div className="flex flex-col px-6 py-4 space-y-4 text-gray-800 font-medium animate-slide-down">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#4B3621]">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#4B3621]">About</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)} className="hover:text-[#4B3621]">Services</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#4B3621]">Contact</Link>
            <Link
              to="/quote"
              onClick={() => setMenuOpen(false)}
              className="bg-[#4B3621] text-white px-4 py-2 rounded-full hover:bg-[#3a2b1a] transition text-sm font-semibold text-center"
            >
              Get an Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
