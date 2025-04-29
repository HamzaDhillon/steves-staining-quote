export default function Services() {
  return (
    <section>
      {/* Background image top banner */}
      <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url('/images/cleaning.jpg')` }}></div>

      {/* Services content */}
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-12 text-center text-[#4B3621]">Our Services</h1>

        {/* Main services description */}
        <div className="space-y-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-[#4B3621]">Maintenance Service</h2>
            <p className="text-gray-700">
              Regular maintenance every 2–4 years is crucial for the longevity of your stained wood.
              We offer professional cleaning and re-staining services to keep your outdoor spaces looking their best.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-[#4B3621]">Oil-Based Penetrating Stains</h2>
            <p className="text-gray-700">
              We use only premium, contractor-grade, oil-based penetrating stains — providing deeper wood absorption
              and far better durability than hardware store products.
            </p>
          </div>
        </div>

        {/* Three Step Process */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#4B3621]">Our 3-Step Process</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Every project follows our proven three-step method, ensuring the highest quality and longest-lasting results.
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
            <div className="text-7xl font-extrabold text-[#4B3621] mb-6">1</div>
            <h3 className="text-2xl font-semibold mb-4 text-[#4B3621]">Strip Coatings</h3>
            <p className="text-gray-700">
              Carefully remove old stains, paints, and sealers to reveal the natural wood underneath — essential for perfect adhesion and results.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
            <div className="text-7xl font-extrabold text-[#4B3621] mb-6">2</div>
            <h3 className="text-2xl font-semibold mb-4 text-[#4B3621]">Wash & Brighten</h3>
            <p className="text-gray-700">
              Deep-clean the wood and brighten its tone, neutralizing old residues and restoring its true, vibrant character.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
            <div className="text-7xl font-extrabold text-[#4B3621] mb-6">3</div>
            <h3 className="text-2xl font-semibold mb-4 text-[#4B3621]">Sand & Stain</h3>
            <p className="text-gray-700">
              Where needed, we sand to smooth imperfections. Then we apply a rich, deep-penetrating stain for long-term beauty and protection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
