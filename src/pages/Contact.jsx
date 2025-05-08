import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="text-gray-800 pt-16">
      {/* Header with Background Image */}
      <section
        className="h-64 bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url('/images/lawn.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-200">We’d love to hear from you.</p>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-start">
          {/* Contact Details */}
          <div className="md:w-1/2 space-y-6" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-[#4B3621] mb-4">Get in Touch</h2>
            <p className="text-gray-700">
              <strong>Address:</strong> 500 Fairville Rd, Mount Stewart, PE C0A 1T0
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong>{' '}
              <a href="tel:+19023140505" className="text-[#4B3621] hover:underline">
                +1 (902) 314-0505
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:steve@instantestimates.ca" className="text-[#4B3621] hover:underline">
                steve@instantestimates.ca
              </a>
            </p>
            <div>
              <strong className="text-gray-700">Business Hours:</strong>
              <ul className="text-gray-700 list-disc list-inside mt-2">
                <li>Monday – Friday: 09:00 am – 06:00 pm</li>
                <li>Saturday: 10:00 am – 04:00 pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form className="md:w-1/2 space-y-4" data-aos="fade-left">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full border border-gray-300 p-3 rounded h-40"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[#4B3621] hover:bg-[#3a2b1a] text-white px-6 py-3 rounded-full transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Embedded Map */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6" data-aos="fade-up">
          <iframe
            title="Steve's Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.342625848885!2d-62.7990003!3d46.2706402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5e45d56c0189bf%3A0xf0966591e15e6dc4!2s500%20Fairville%20Rd%2C%20Mount%20Stewart%2C%20PE%20C0A%201T0!5e0!3m2!1sen!2sca!4v1714420134560!5m2!1sen!2sca"
            width="100%"
            height="400"
            className="rounded-xl shadow-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
