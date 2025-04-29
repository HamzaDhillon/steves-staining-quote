// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center py-4 px-6">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3">
          {/* Shrunk a bit so it doesn’t dominate */}
          <img
            src="/images/logo2.png"
            alt="Steve's Logo"
            className="h-10 w-auto"
          />
          {/* Brand name heading to fill space */}
          <span className="text-2xl font-bold text-gray-800">
            Steve’s Staining & Restoration Services
          </span>
        </Link>

        {/* Push nav to the right, and give it some margin-left */}
        <nav className="ml-auto space-x-8 text-gray-800 font-semibold">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
