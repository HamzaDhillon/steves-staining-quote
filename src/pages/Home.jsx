import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="text-gray-800 scroll-smooth">
      {/* Hero Section */}
      <section
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center relative"
        style={{ backgroundImage: "url('/images/sea-side.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 p-6 bg-white bg-opacity-70 rounded-lg shadow-lg max-w-xl mx-auto">
          <img src="/images/logo2.png" alt="Steve's Logo" className="h-24 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Bring Your Deck Back to Life</h1>
          <p className="text-lg md:text-xl mb-6">Professional Wood Staining & Restoration Services</p>
          <Link to="#contact" className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition">
            Get an Estimate
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 space-y-24">
          {/* 1. Intro */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4B3621]">About Us</h2>
              <p className="text-gray-700 mb-4">
                At Steve’s Staining & Restoration, we specialize in staining new, old, and really old decks, fences, and wood structures.
              </p>
              <p className="text-gray-700">
                With limited months to enjoy the outdoors, we make sure your wood surfaces look luxurious, protected, and last longer.
              </p>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <img src="/images/deck1.jpg" loading="lazy" alt="Deck Restoration" className="rounded-xl shadow-lg w-full h-auto object-cover" />
            </div>
          </div>

          {/* 2. What We Stain */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div className="md:w-1/2" data-aos="fade-left">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[#4B3621]">What We Stain</h3>
              <p className="text-gray-700 mb-4">
                Decks, fences, pergolas, furniture, swing sets—you name it. We stain and restore with care and craftsmanship.
              </p>
              <p className="text-gray-700">
                Every surface gets a flawless finish and long-lasting protection.
              </p>
            </div>
            <div className="md:w-1/2" data-aos="fade-right">
              <img src="/images/deck2.jpg" loading="lazy" alt="Fence Restoration" className="rounded-xl shadow-lg w-full h-auto object-cover" />
            </div>
          </div>

          {/* 3. Quality Commitment */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2" data-aos="fade-right">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[#4B3621]">Commitment to Quality</h3>
              <p className="text-gray-700 mb-4">
                Our proven 3-step process (Strip, Brighten, Stain) gives you a stunning look with a <span className="font-bold text-[#4B3621]">2-year warranty</span>.
              </p>
              <p className="text-gray-700">
                With Steve’s, you get long-term peace of mind.
              </p>
            </div>
            <div className="md:w-1/2" data-aos="fade-left">
              <img src="/images/hero-bg.jpg" loading="lazy" alt="Deck Surface" className="rounded-xl shadow-lg w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#4B3621]">Our 3-Step Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              step: '1',
              title: 'Strip Coatings',
              desc: 'Remove old stains/paints to expose the natural wood grain.'
            }, {
              step: '2',
              title: 'Wash & Brighten',
              desc: 'Deep-clean and neutralize residues to prepare for stain.'
            }, {
              step: '3',
              title: 'Sand & Stain',
              desc: 'Sand and apply rich, penetrating stain for long-lasting beauty.'
            }].map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition" data-aos="fade-up">
                <div className="text-6xl font-extrabold text-[#4B3621] mb-4">{step}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#4B3621]">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oil-Based Stain Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4B3621]">Oil-Based Penetrating Stain</h2>
            <p className="text-gray-700 mb-4">
              Unlike film-forming stains, our deep-penetrating formula soaks into the wood for lasting protection.
            </p>
            <p className="text-gray-700 mb-4">
              Used by professionals only, our stain is durable, beautiful, and weather-resistant.
            </p>
            <p className="text-gray-700">
              Experience the difference of a stain that works from the inside out.
            </p>
          </div>
          <div className="md:w-1/2" data-aos="fade-left">
            <img src="/images/surface-vs-penetrating.png" loading="lazy" alt="Oil-based stain" className="rounded-xl shadow-lg w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Contact Highlight */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gray-100 rounded-2xl shadow-lg p-10 flex flex-col md:flex-row items-center justify-between gap-10" data-aos="fade-up">
            {/* Contact Info */}
            <div className="text-center md:text-left space-y-4 md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B3621]">Let's Work Together</h2>
              <p className="text-gray-700">Deck or fence restoration? We're here to help.</p>
              <div className="space-y-1 text-gray-700">
                <p><strong>📍 Address:</strong> 500 Fairville Rd, Mount Stewart, PE C0A 1T0</p>
                <p><strong>📞 Phone:</strong> <a href="tel:+19023140505" className="text-[#4B3621] hover:underline">+1 (902) 314-0505</a></p>
                <p><strong>✉️ Email:</strong> <a href="mailto:steve@stevesstainingservices.ca" className="text-[#4B3621] hover:underline">steve@stevesstainingservices.ca</a></p>
                <p><strong>🕒 Hours:</strong> Mon–Fri: 9am–6pm, Sat: 10am–4pm, Sun: Closed</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="md:w-1/2 flex justify-center">
              <Link to="/contact" className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-4 px-10 rounded-full text-lg transition">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
