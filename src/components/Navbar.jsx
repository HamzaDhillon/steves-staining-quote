import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/images/logo2.png"
            alt="Steve's Logo"
            className="h-12 w-auto"
          />
          <div className="leading-tight">
            <h1 className="text-xl font-bold text-gray-800">
              STEVE’S
            </h1>
            <h2 className="text-sm font-semibold text-gray-600">
              Staining & Restoration
            </h2>
          </div>
        </Link>

        {/* Navigation + Button */}
        <div className="flex items-center space-x-6">
          <nav className="space-x-6 text-gray-800 font-medium hidden md:flex">
            <Link to="/" className="hover:text-[#4B3621] transition">Home</Link>
            <Link to="/about" className="hover:text-[#4B3621] transition">About</Link>
            <Link to="/services" className="hover:text-[#4B3621] transition">Services</Link>
            <Link to="/contact" className="hover:text-[#4B3621] transition">Contact</Link>

          </nav>

          {/* Get a Quote Button */}
          <Link
            to="/quote"
            className="bg-[#4B3621] text-white px-4 py-2 rounded-lg hover:bg-[#3a2b1a] transition text-sm font-semibold"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
