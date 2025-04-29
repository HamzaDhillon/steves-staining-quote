// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <div className="text-gray-800">

      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center relative"
        style={{ backgroundImage: "url('images/sea-side.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
          {<img src="/images/logo2.png" alt="Steve's Logo" className="h-32 mx-auto mb-6" />}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bring Your Deck Back to Life</h1>
          <p className="text-lg md:text-xl mb-6">Professional Wood Staining & Restoration Services</p>
          <Link to="#quote" className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition">Get an Estimate</Link>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 space-y-24">

          {/* Main Introduction */}
          <div className="flex flex-col md:flex-row items-center gap-12 group">
            {/* Text */}
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6 text-[#4B3621]">About Us</h2>
              <p className="text-gray-700 mb-4">
                At Steve’s Staining & Restoration, we believe your outdoor spaces deserve to be as beautiful as the memories you create on them.
                We specialize in staining new, old, and really old decks, fences, and wood structures — restoring them from faded and worn to vibrant and renewed.
              </p>
              <p className="text-gray-700">
                With only a few precious months each year to enjoy our decks fully, why not make them look and feel luxurious with deep, rich wood grain?
                We’re passionate about helping you achieve this transformation with ease and care.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2" data-aos="fade-left">
              <img src="/images/deck1.jpg" alt="Deck Restoration" className="rounded-xl shadow-lg w-full max-w-md mx-auto" />
            </div>
          </div>

          {/* What We Stain */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
            {/* Text */}
            <div className="md:w-1/2" data-aos="fade-left">
              <h3 className="text-3xl font-semibold mb-4 text-[#4B3621]">What We Stain</h3>
              <p className="text-gray-700 mb-4">
                We restore and stain decks, fences, pergolas, swing sets, outdoor furniture, and other wooden structures — bringing life and beauty back to your outdoor spaces.
              </p>
              <p className="text-gray-700">
                Every project is treated with the care and craftsmanship it deserves, ensuring long-lasting protection and a flawless finish.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2" data-aos="fade-right">
              <img src="/images/deck2.jpg" alt="Fence Restoration" className="rounded-xl shadow-lg w-full max-w-md mx-auto" />
            </div>
          </div>

          {/* Commitment to Quality */}
          <div className="flex flex-col md:flex-row items-center gap-12 group">
            {/* Text */}
            <div className="md:w-1/2" data-aos="fade-right">
              <h3 className="text-3xl font-semibold mb-4 text-[#4B3621]">Commitment to Quality</h3>
              <p className="text-gray-700 mb-4">
                Using our proven 3-step process — Strip, Wash & Brighten, then Sand & Stain — we guarantee a transformation that both protects and beautifies your wood.
              </p>
              <p className="text-gray-700">
                We proudly offer a <span className="font-bold text-[#4B3621]">2-year warranty</span> against fading, flaking, and peeling.
                With Steve’s Staining, you're not just getting a service — you're getting long-term peace of mind.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2" data-aos="fade-left">
              <img src="/images/hero-bg.jpg" alt="Deck Surface" className="rounded-xl shadow-lg w-full max-w-md mx-auto" />
            </div>
          </div>

        </div>
      </section>

      {/* Our 3-Step Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#4B3621]">Our 3-Step Process</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-12">
            We use a simple, proven 3-step method to breathe new life into your decks, fences, and outdoor wood structures — restoring their beauty and protecting them for years to come.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-7xl font-extrabold text-[#4B3621] mb-6">1</div>
              <h3 className="text-2xl font-semibold mb-4 text-[#4B3621]">Strip Coatings</h3>
              <p className="text-gray-700">
                We carefully remove old stains, paints, and sealers to expose the natural wood grain — the foundation for a flawless restoration.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-7xl font-extrabold text-[#4B3621] mb-6">2</div>
              <h3 className="text-2xl font-semibold mb-4 text-[#4B3621]">Wash & Brighten</h3>
              <p className="text-gray-700">
                We deep-clean and brighten your wood, neutralizing residues and enhancing the natural beauty ready for staining.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-md rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-7xl font-extrabold text-[#4B3621] mb-6">3</div>
              <h3 className="text-2xl font-semibold mb-4 text-[#4B3621]">Sand & Stain</h3>
              <p className="text-gray-700">
                We sand where needed, then apply a rich, penetrating oil-based stain that protects and beautifies for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oil-Based Penetrating Stain Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

          {/* Text Content */}
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-6 text-[#4B3621]">Oil-Based Penetrating Stain</h2>
            <p className="text-gray-700 mb-4">
              We use a deep-penetrating stain that isn't sold in big box stores. This stain is almost exclusively used by professional contractors.
              It comes in a variety of popular choices and is known for its outstanding durability and lasting beauty.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Why?</strong><br />
              Water-based and most oil-based stains from hardware stores are called <em>film-forming stains</em> — they simply coat the surface like a layer of paint.
            </p>
            <p className="text-gray-700">
              A deep-penetrating stain actually <strong>penetrates into the wood</strong> and works from the inside out, preserving and protecting your outdoor wood for much longer.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2" data-aos="fade-left">
            <img src="/images/surface-vs-penetrating.png" alt="Modern backyard patio with wooden decking" className="rounded-xl shadow-lg w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Get an Estimate</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label>Square Footage</label>
              <input type="number" placeholder="Enter square footage" className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label>Railing Length (feet)</label>
              <input type="number" placeholder="Enter railing length" className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label>Steps (quantity)</label>
              <input type="number" placeholder="Enter number of steps" className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label>Deck Age</label>
              <select className="border p-2 rounded">
                <option>New</option>
                <option>6–12 Months</option>
                <option>1–3 Years</option>
                <option>3–10 Years</option>
                <option>10+ Years</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label>Services Requested</label>
              <select className="border p-2 rounded">
                <option>Wash</option>
                <option>Stain</option>
                <option>Wash & Stain</option>
                <option>Strip & Stain</option>
                <option>Not Sure</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label>Service Address</label>
              <input type="text" placeholder="Address" className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input type="text" placeholder="Phone" className="border p-2 rounded" />
            </div>
            <div className="flex flex-col">
              <label>Email Address</label>
              <input type="email" placeholder="Email" className="border p-2 rounded" />
            </div>
            <button className="w-full bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-6 rounded-full transition">Send Estimate Request</button>
          </form>
        </div>
      </section>

      {/* Contact Highlight Section for Home */}
<section id="contact" className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="bg-gray-100 rounded-2xl shadow-lg p-10 flex flex-col md:flex-row items-center justify-between gap-10" data-aos="fade-up">
      
      {/* Left: Text Block */}
      <div className="text-center md:text-left space-y-4 md:w-1/2">
        <h2 className="text-4xl font-bold text-[#4B3621]">Let's Work Together</h2>
        <p className="text-gray-700">
          We’re here to help with all your deck and fence restoration needs.
        </p>
        <div className="space-y-1 text-gray-700">
          <p><strong>📍 Address:</strong> 500 Fairville Rd, Mount Stewart, PE C0A 1T0</p>
          <p><strong>📞 Phone:</strong> <a href="tel:+19023140505" className="text-[#4B3621] hover:underline">+1 (902) 314-0505</a></p>
          <p><strong>✉️ Email:</strong> <a href="mailto:steve@stevesstainingservices.ca" className="text-[#4B3621] hover:underline">steve@stevesstainingservices.ca</a></p>
          <p><strong>🕒 Hours:</strong> Mon–Fri: 9am–6pm, Sat: 10am–4pm, Sun: Closed</p>
        </div>
      </div>

      {/* Right: Call to Action Button */}
      <div className="md:w-1/2 flex justify-center">
        <a href="/contact" className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-4 px-10 rounded-full text-lg transition">
          Get in Touch
        </a>
      </div>

    </div>
  </div>
</section>

    </div>
  );
}
