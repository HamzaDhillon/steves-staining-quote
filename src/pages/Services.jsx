import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      title: 'Staining New Wood',
      description:
        'We professionally stain brand new decks, fences, and other outdoor wood surfaces. Our oil-based stains penetrate deeply to enhance color and protect from the start.',
    },
    {
      title: 'Restoring Old or Weathered Wood',
      description:
        'We revive faded, grey, or green wood using expert stripping and cleaning methods, revealing the wood’s natural beauty before restaining it for lasting protection.',
    },
    {
      title: 'Maintenance Washing',
      description:
        'Our maintenance service includes soft washing and stain refreshes every 2–4 years. Keep your outdoor wood looking clean, protected, and vibrant long term.',
    },
  ];

  return (
    <div className="text-gray-800 pt-16 ">
      {/* Header with Single Image */}
      <section className="h-64 bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('/images/staining.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white">Our Services</h1>
          <p className="text-lg mt-2 text-gray-200">Staining • Restoration • Maintenance</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map(({ title, description }) => (
              <div key={title} className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition" data-aos="fade-up">
                <h3 className="text-xl font-semibold mb-3 text-[#4B3621]">{title}</h3>
                <p className="text-gray-700">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4B3621]">Our 3-Step Process</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-12">
            Every project follows our proven method to ensure clean results and beautiful finishes that last.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Strip Coatings',
                desc: 'We remove previous finishes to give the stain a proper base and reveal natural wood.',
              },
              {
                step: '2',
                title: 'Wash & Brighten',
                desc: 'We clean the surface thoroughly and restore wood tone using a brightener treatment.',
              },
              {
                step: '3',
                title: 'Sand & Stain',
                desc: 'Light sanding and premium oil-based staining seal and protect the wood beautifully.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="text-5xl font-extrabold text-[#4B3621] mb-4">{step}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#4B3621]">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
