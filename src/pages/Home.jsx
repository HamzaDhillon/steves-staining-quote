import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="pt-16 text-gray-800 scroll-smooth">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white px-6 text-center"
        style={{ backgroundImage: "url('/images/wood.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-2xl px-6 py-14 bg-white/80 rounded-2xl shadow-xl backdrop-blur-md space-y-6"
          data-aos="zoom-in"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#4B3621]">
            Bring Your Deck Back to Life
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Professional wood staining & restoration services that protect and beautify.
          </p>
          <div className="space-y-2">
            <Link
              to="/quote"
              className="inline-block bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition shadow-md animate-bounce"
            >
              INSTANT ESTIMATE
            </Link>
            <p className="text-lg md:text-xl font-semibold text-gray-700">
              NO Site Visit Required!
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-4xl md:text-5xl font-bold text-center text-[#4B3621] mb-20"
            data-aos="fade-up"
          >
            What We Stain
          </h2>

          <div className="grid gap-16 md:grid-cols-3 sm:grid-cols-1">
            {[
              {
                title: 'Decks',
                icon: '/images/deck_finish.webp',
                desc: 'We restore and stain decks to enhance durability and showcase the natural wood grain.',
              },
              {
                title: 'Fences',
                icon: '/images/fence.jpg',
                desc: 'Protect your fence from weather and wear while improving your home’s curb appeal.',
              },
              {
                title: 'Outdoor Structures',
                icon: '/images/pergola.JPG',
                desc: 'From pergolas to gazebos, we stain and seal all outdoor wood structures with care.',
              },
            ].map(({ title, icon, desc }, idx) => (
              <div
                key={title}
                className="relative group perspective"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="relative w-full aspect-[4/3] transform-gpu transition duration-500 group-hover:rotate-y-6 group-hover:scale-[1.03]">
                  <div className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-full w-full">
                      <img
                        src={icon}
                        alt={title}
                        className="h-full w-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-2xl font-bold drop-shadow">{title}</h3>
                        <p className="text-sm mt-2 leading-snug drop-shadow-sm">{desc}</p>
                        <div className="w-10 h-1 bg-white mt-3 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 
<section className="py-16 bg-white border-t border-gray-200" id="measuring-guide">
  <div className="max-w-6xl mx-auto px-6" data-aos="fade-up">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4B3621] mb-10">
      How to Measure Your Deck & Fence
    </h2>

    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
        <p>
          Getting an accurate estimate starts with a few simple measurements. You don't need professional tools —
          just a measuring tape and a few minutes.
        </p>

        <h3 className="text-2xl font-semibold text-[#4B3621]">Measuring Your Deck</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Measure the <strong>length</strong> and <strong>width</strong> of your deck (in feet). Multiply them
            to get total square footage.
          </li>
          <li>
            Measure the <strong>length of all railings</strong> around the deck.
          </li>
          <li>
            Count how many <strong>steps</strong> lead up or down from the deck.
          </li>
        </ol>

        <h3 className="text-2xl font-semibold text-[#4B3621] mt-8">Measuring Your Fence</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Measure the <strong>total length</strong> of your fence in feet (add up all sides).
          </li>
          <li>
            Measure the <strong>height</strong> of the fence.
          </li>
          <li>
            Let us know if the fence is <strong>double-sided</strong> (stained on both sides) or single-sided.
          </li>
        </ol>

        <p className="mt-6">
          Enter these numbers into our estimate form, and we’ll do the rest — no site visit required.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img src="/images/deck-measure-example.png" alt="Deck measurement example" className="w-full h-auto object-cover" />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img src="/images/fence-measure-example.jpg" alt="Fence measurement example" className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  </div>
</section>
*/}

      {/* 3-Step Process */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#4B3621]" data-aos="fade-up">
            Our 3-Step Wood Restoration Process
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
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
                className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition space-y-3"
                data-aos="fade-up"
              >
                <div className="text-6xl font-extrabold text-[#4B3621]">{step}</div>
                <h3 className="text-2xl font-semibold text-[#4B3621]">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
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

      {/* CTA */}
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
            className="inline-block bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition shadow-md"
          >
            Request an Estimate
          </Link>
        </div>
      </section>
    </div>
  );
}
