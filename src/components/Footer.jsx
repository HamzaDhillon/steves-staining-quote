export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Steve's Wood Staining & Restoration. All rights reserved.</p>
        <p className="text-gray-700">
        Follow us on <a href="https://www.facebook.com/profile.php?id=61574972164896#" target="_blank" rel="noopener noreferrer" className="text-[#4B3621] hover:underline">Facebook</a>
      </p>
      </div>
    </footer>
  );
}
