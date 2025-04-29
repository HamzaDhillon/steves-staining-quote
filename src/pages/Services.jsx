export default function Services() {
    return (
      <section>
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url('/services.jpg')` }}></div>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8">Our Services</h1>
  
          <div className="space-y-6 mb-10">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Maintenance Service</h2>
              <p>
                Maintenance after 2-4 years is crucial to the longevity of your stained wood. 
                We provide cleaning and re-staining services to keep your wood looking new.
              </p>
            </div>
  
            <div>
              <h2 className="text-2xl font-semibold mb-2">Oil-Based Penetrating Stains</h2>
              <p>
                We use professional contractor-grade stains that deeply penetrate the wood, providing superior durability compared to hardware store brands.
              </p>
            </div>
          </div>
  
          {/* Three Step Process Cards */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Our 3-Step Process</h2>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-red-600 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Strip Coatings</h3>
              <p>We carefully remove old coatings to expose the natural wood grain, preparing it for a fresh new finish.</p>
            </div>
  
            {/* Step 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-red-600 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Wash & Brighten</h3>
              <p>We clean and brighten the wood surface to restore its natural beauty before applying stain.</p>
            </div>
  
            {/* Step 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-red-600 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Sand & Stain</h3>
              <p>We perform sanding where necessary and then apply high-quality oil-based stain for long-term protection.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  