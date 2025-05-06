// src/pages/About.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="text-gray-800">

      {/* Hero Section */}
      <section className="h-80 bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white">About Us</h1>
          <p className="text-xl text-gray-200 mt-4">Passionate Craftsmanship. Lasting Beauty.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-screen-xl space-y-24">

          {/* Who We Are */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6 text-[#4B3621]">Who We Are</h2>
              <p className="text-gray-700 mb-4">
                Steve’s Staining & Restoration is built on a simple mission: to make your outdoor spaces feel as beautiful as your indoor ones.
                Our team specializes in restoring tired decks, fences, pergolas, and outdoor wood structures into stunning, vibrant features you’ll love.
              </p>
              <p className="text-gray-700">
                With years of hands-on experience, a passion for craftsmanship, and a commitment to excellence, we deliver results that last — guaranteed.
              </p>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <img src="/images/deck1.jpg" alt="Deck Restoration" className="rounded-2xl shadow-lg w-full max-w-md mx-auto" />
            </div>
          </div>

          {/* Our Process */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-left">
              <h2 className="text-4xl font-bold mb-6 text-[#4B3621]">Our 3-Step Process</h2>
              <ul className="text-gray-700 list-disc list-inside space-y-2">
                <li><span className="font-semibold text-[#4B3621]">Strip Coatings:</span> Removing old stains and sealers to reveal the natural wood grain.</li>
                <li><span className="font-semibold text-[#4B3621]">Wash & Brighten:</span> Cleaning and restoring the wood’s natural vibrancy.</li>
                <li><span className="font-semibold text-[#4B3621]">Sand & Stain:</span> Final prep and application of premium oil-based stains for lasting beauty and protection.</li>
              </ul>
            </div>
            <div className="md:w-1/2" data-aos="fade-right">
              <img src="/images/deck2.jpg" alt="Process Example" className="rounded-2xl shadow-lg w-full max-w-md mx-auto" />
            </div>
          </div>

          {/* Our Guarantee */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6 text-[#4B3621]">Our Guarantee</h2>
              <p className="text-gray-700 mb-4">
                We proudly back every project with a <span className="font-semibold text-[#4B3621]">2-year warranty</span> against fading, flaking, and peeling.
              </p>
              <p className="text-gray-700">
                We use only premium-grade materials and time-tested methods to ensure your investment stays beautiful year after year.
                Customer trust and satisfaction are the foundations of our company.
              </p>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <img src="/images/hero-bg.jpg" alt="Quality Guarantee" className="rounded-2xl shadow-lg w-full max-w-md mx-auto" />
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-100 text-center">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4B3621]">Ready to Transform Your Deck or Fence?</h2>
          <p className="text-gray-700 mb-8">Contact us today for a free estimate and let’s bring your outdoor spaces back to life.</p>
                <Link to="/quote" className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition">
                       Get an Estimate
                     </Link>
        </div>
      </section>
    </div>
  );
}
