// src/pages/About.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CheckCircle } from 'lucide-react';


export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="text-gray-800 pt-16">
      {/* Header with Background Image */}
      <section
        className="h-64 bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/sea-side.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white">About Us</h1>
          <p className="mt-4 text-lg text-gray-200">Experts in wood restoration across PEI</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-4 text-[#4B3621]">Who We Are</h2>
            <p className="text-gray-700 mb-4">
              At Steve’s Staining & Restoration, our mission is to make your outdoor wood look its absolute best — and stay that way.
            </p>
            <p className="text-gray-700">
              We specialize in staining and restoring decks, fences, and wood structures with care, passion, and a satisfaction-first mindset.
            </p>
          </div>
          <div data-aos="fade-left">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-2">
              {/* Why Choose Us */}
              <h3 className="text-2xl font-semibold text-[#4B3621] mb-4">Why Choose Us?</h3>
              <ul className="space-y-4 text-gray-700 text-base">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-[#4B3621] w-5 h-5 mt-1" />
                  <span>Ultra low VOC oil stains — safe for pets, kids, and your backyard.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-[#4B3621] w-5 h-5 mt-1" />
                  <span>We’re fully insured and offer a warranty on our work.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="text-[#4B3621] w-5 h-5 mt-1" />
                  <span>PEI’s only company dedicated solely to professional staining.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-[#fafafa] border-y">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img
              src="/images/deck2.jpg"
              alt="Deck Process"
              className="rounded-2xl shadow-lg w-full max-w-sm mx-auto"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4 text-[#4B3621]">How We Work</h2>
            <p className="text-gray-700 mb-4">
              Our process is simple, effective, and time-tested. We bring wood back to life in 3 expert stages:
            </p>
            <div className="space-y-3">
              <div><span className="font-semibold text-[#4B3621]">1. Strip:</span> We remove old finishes to expose raw grain.</div>
              <div><span className="font-semibold text-[#4B3621]">2. Wash:</span> A deep clean followed by a brightener to restore vibrancy.</div>
              <div><span className="font-semibold text-[#4B3621]">3. Stain:</span> Premium oil-based stain for deep, lasting beauty.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guarantee */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-4 text-[#4B3621]">Our Guarantee</h2>
            <p className="text-gray-700 mb-4">
              We stand by our work with a <span className="font-semibold text-[#4B3621]">2-year warranty</span> — covering flaking, fading, and peeling.
            </p>
            <p className="text-gray-700">
              You’ll always get honest advice, great service, and professional-grade results.
            </p>
          </div>
          <div data-aos="fade-left">
            <img
              src="/images/hero-bg.jpg"
              alt="Guarantee"
              className="rounded-2xl shadow-lg w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f3f4f6] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4B3621]">Let’s Transform Your Outdoor Space</h2>
          <p className="text-gray-700 mb-6">
            Book a free estimate and see how our team can restore beauty to your wood.
          </p>
          <Link to="/quote" className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition">
            Get an Estimate
          </Link>
        </div>
      </section>
    </div>
  );
}
