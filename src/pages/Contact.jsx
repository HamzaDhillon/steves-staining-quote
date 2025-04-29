export default function Contact() {
    return (
      <section>
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url('/contact.jpg')` }}></div>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
          <form className="max-w-md mx-auto space-y-4">
            <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
            <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
            <textarea placeholder="Message" className="w-full border p-2 rounded"></textarea>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Submit Form</button>
          </form>
  
          <div className="mt-8">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11200.708406879607!2d-62.883586!3d46.348899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5ee0f8d1c52cf5%3A0xf49ff50b9992fceb!2sMount%20Stewart%2C%20PE!5e0!3m2!1sen!2sca!4v1685826379730!5m2!1sen!2sca"
              className="w-full h-64 rounded mt-4"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    );
  }
  