// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-gray-800">

      {/* Hero Section */}
      <section 
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center relative"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
          {/* <img src="/images/logo.png" alt="Steve's Logo" className="h-24 mx-auto mb-6" /> */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bring Your Deck Back to Life</h1>
          <p className="text-lg md:text-xl mb-6">Professional Wood Staining & Restoration Services</p>
          <Link to="#quote" className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white py-3 px-8 rounded-full text-lg transition">Get an Estimate</Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="mb-4">
              We specialize in staining new, old, and really old decks and fences, transforming them into vibrant, luxurious spaces. 
              We restore pergolas, swing sets, chairs, and more! Our commitment to quality includes a 2-year warranty against fading, flaking, and peeling.
            </p>
            <p>
              Using our specific three-step process—strip, wash & brighten, then stain—we breathe new life into your wood structures.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="/images/deck1.jpg" alt="Deck Restoration" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Process</h2>
          <p className="mb-8">
            Depending on your wood, we strip any old coating, wash and brighten the surface, sand if necessary, and finally apply 
            a deep-penetrating stain that restores your deck’s natural beauty.
          </p>
          <div className="flex justify-center">
            <img src="/images/surface-vs-penetrating.png" alt="Surface vs Penetrating Finish" className="max-w-2xl rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Deck Staining</h3>
              <p>Enhance your deck’s longevity and look with our premium staining services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Fence Staining</h3>
              <p>Protect your fences with our durable and beautiful staining solutions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">Maintenance Cleaning</h3>
              <p>Keep your wood looking fresh and strong with our maintenance services every 2–4 years.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Gallery</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <img src="/images/deck1.jpg" alt="Deck 1" className="rounded-lg shadow-md" />
            <img src="/images/deck2.jpg" alt="Deck 2" className="rounded-lg shadow-md" />
            <img src="/images/hero-bg.jpg" alt="Deck 3" className="rounded-lg shadow-md" />
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

      {/* Contact Info Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p>Email: steve@stevesstainingservices.ca</p>
          <p>Phone: +1.902.314.0505</p>
          <p>Address: 500 Fairville Rd</p>
        </div>
      </section>

    </div>
  );
}
