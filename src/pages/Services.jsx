export default function Services() {
  return (
    <div className="text-gray-800">
      {/* Hero Banner */}
      <section className="h-64 bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: `url('/images/cleaning.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white">Our Services</h1>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="space-y-16 mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4B3621]">Maintenance Service</h2>
              <p className="text-gray-700">
                Regular maintenance every 2–4 years is crucial for the longevity of your stained wood.
                We offer professional cleaning and re-staining services to keep your outdoor spaces looking their best.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4B3621]">Oil-Based Penetrating Stains</h2>
              <p className="text-gray-700">
                We use only premium, contractor-grade, oil-based penetrating stains — providing deeper wood absorption
                and far better durability than hardware store products.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4B3621]">Our 3-Step Process</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Every project follows our proven three-step method, ensuring the highest quality and longest-lasting results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              step: '1',
              title: 'Strip Coatings',
              desc: 'Carefully remove old stains, paints, and sealers to reveal the natural wood underneath — essential for perfect adhesion and results.'
            }, {
              step: '2',
              title: 'Wash & Brighten',
              desc: 'Deep-clean the wood and brighten its tone, neutralizing old residues and restoring its true, vibrant character.'
            }, {
              step: '3',
              title: 'Sand & Stain',
              desc: 'Where needed, we sand to smooth imperfections. Then we apply a rich, deep-penetrating stain for long-term beauty and protection.'
            }].map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                <div className="text-6xl font-extrabold text-[#4B3621] mb-4">{step}</div>
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
