import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <>
      <div className="pt-16 text-gray-800 scroll-smooth">
        {/* Hero */}
        <section
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white px-6 text-center"
          style={{ backgroundImage: "url('/images/wood.png')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 bg-white/80 rounded-2xl shadow-xl" data-aos="zoom-in">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-[#4B3621]">
              Bring Your Deck Back to Life
            </h1>
            <p className="text-lg md:text-xl mb-4 text-gray-700">
              Professional wood staining & restoration services that protect and beautify.
            </p>
            <Link
              to="/quote"
              className="inline-block bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg animate-bounce transition mt-6"
            >
              Get an Estimate
            </Link>

          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-10 text-[#4B3621]"
              data-aos="fade-up"
            >
              What We Stain
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: 'Decks', icon: '/images/deck_finish.webp' },
                { title: 'Fences', icon: '/images/fence.jpg' },
                { title: 'Other Outdoor Structures', icon: '/images/pergola.jpg' },
              ].map(({ title, icon }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
                  data-aos="fade-up"
                >
                  <img
                    src={icon}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#4B3621]">{title}</h3>
                  </div>
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
