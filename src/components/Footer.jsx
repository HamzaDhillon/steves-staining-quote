import { FaFacebookSquare } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#4B3621] text-white py-6 mt-8">
      <div className="container mx-auto text-center space-y-2">
        <p className="text-sm">&copy; {new Date().getFullYear()} Steve's Wood Staining & Restoration. All rights reserved.</p>
        <p className="flex justify-center items-center gap-2 text-sm">
          <span>Follow us on</span>
          <a
            href="https://www.facebook.com/profile.php?id=61574972164896#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaFacebookSquare size={20} />
          </a>
        </p>
      </div>
    </footer>
  );
}
