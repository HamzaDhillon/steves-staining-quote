export default function About() {
    return (
      <section>
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url('/about.jpg')` }}></div>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="mb-4">
            We specialize in staining new, old, and really aged decks and fences — transforming them from faded and dull to vibrant and new. 
            Our mission is to bring out the deep wood grain and protect your outdoor investment.
          </p>
          <p>
            With only a few short summer months to enjoy, why not make your deck the centerpiece of your backyard? 
            We are committed to delivering stunning results with attention to detail and top-grade materials.
          </p>
        </div>
      </section>
    );
  }
  