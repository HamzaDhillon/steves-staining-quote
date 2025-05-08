import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Paintbrush, ShieldCheck, Leaf } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md shadow-md z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src="/images/logo2.png" alt="Logo" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-[#4B3621]">Steve's Staining</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="#about" className="text-gray-700 hover:text-[#4B3621] transition">About</Link>
            <Link to="#services" className="text-gray-700 hover:text-[#4B3621] transition">Services</Link>
            <Link to="#process" className="text-gray-700 hover:text-[#4B3621] transition">Process</Link>
            <Link to="#contact" className="text-gray-700 hover:text-[#4B3621] transition">Contact</Link>
          </div>
          <Link
            to="/quote"
            className="hidden md:inline-block bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-2 px-6 rounded-full text-lg transition"
          >
            Get Estimate
          </Link>
        </div>
      </nav>

      <div className="pt-16 text-gray-800 scroll-smooth">
        {/* Hero Section */}


        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white px-6"
          style={{ backgroundImage: "url('/images/wood.png')" }} // replace with your background image
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl text-center" data-aos="zoom-in">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Expert Wood Staining for a Lasting First Impression
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Transform your outdoor wood with expert staining backed by a 2-year warranty.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-white text-[#4B3621] font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition"
            >
              Get an Estimate
            </Link>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white max-w-3xl mx-auto">
              {[
                { icon: <Paintbrush size={36} />, label: 'Professional Finish' },
                { icon: <ShieldCheck size={36} />, label: '2-Year Warranty' },
                { icon: <Leaf size={36} />, label: 'Eco-Friendly Stains' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center"
                  data-aos="fade-up"
                >
                  <div className="mb-2">{icon}</div>
                  <p className="text-md">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#4B3621]" data-aos="fade-up">
              What We Stain
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Decks', icon: '/images/deck.jpg' },
                { title: 'Fences', icon: '/images/fence.jpg' },
                { title: 'Furniture & More', icon: '/images/furniture.jpg' },
              ].map(({ title, icon }) => (
                <div
                  key={title}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
                  data-aos="fade-up"
                >
                  <img
                    src={icon}
                    alt={title}
                    className="mx-auto h-40 w-full object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-[#4B3621]">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section id="process" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#4B3621]" data-aos="fade-up">
              Our 3-Step Wood Restoration Process
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Strip Coatings',
                  desc: 'Remove old stains and paints to expose natural grain.',
                },
                {
                  step: '2',
                  title: 'Wash & Brighten',
                  desc: 'Deep-clean and neutralize residues.',
                },
                {
                  step: '3',
                  title: 'Sand & Stain',
                  desc: 'Sand and apply penetrating oil-based stain.',
                },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
                  data-aos="fade-up"
                >
                  <div className="text-6xl font-extrabold text-[#4B3621] mb-4">{step}</div>
                  <h3 className="text-2xl font-semibold mb-2 text-[#4B3621]">{title}</h3>
                  <p className="text-gray-700">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4B3621]">About Us</h2>
              <p className="text-gray-700 mb-4">
                At Steve’s Staining & Restoration, we specialize in staining new, old, and historic wood surfaces with precision and care.
              </p>
              <p className="text-gray-700">
                Serving PEI with a commitment to craftsmanship and a 2-year warranty on all projects.
              </p>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <img
                src="/images/deck1.jpg"
                loading="lazy"
                alt="Our team at work"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-20 bg-[#4B3621]/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4B3621]">
              Ready to Transform Your Wood?
            </h2>
            <p className="text-gray-700 mb-8">
              Get a free estimate today and see the difference professional staining makes.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition"
            >
              Request an Estimate
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
