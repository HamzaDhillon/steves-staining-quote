import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar'; 
import Footer from './components/Footer';
import Quote from './components/Quote';
import Quotes from './pages/admin/Quotes';
import PricingEditor from './pages/admin/PricingEditor';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import QuoteDetails from './pages/admin/QuoteDetails';
import QuoteEdit from "./pages/admin/QuoteEdit";
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation as useReactRouterLocation } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

function LayoutWrapper() {
  const location = useReactRouterLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/admin" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/quotes" element={<Quotes />} />
          <Route path="/admin/pricing" element={<PricingEditor />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/quotes/:id" element={<QuoteDetails />} />
          <Route path="/admin/quotes/edit/:id" element={<QuoteEdit />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <LayoutWrapper />
      </div>
    </Router>
  );
}
