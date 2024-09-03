function Support() {
  return (
    <div className="support px-6 md:px-16 lg:px-24 py-6">
      <div className="container flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden shadow-lg relative">
        {/* Content Section */}
        <div className="content flex-1 flex flex-col justify-center p-6">
          <h1 className="text-3xl font-bold mb-4">We support </h1>
          <p className="text-lg mb-6">
            We are taking action to help our freelancers, our clients, and the
            people of so can you.
          </p>
          <button className="px-4 py-2 w-36 bg-amber-500 text-white hover:bg-amber-600 rounded">
            Learn More
          </button>
        </div>

        {/* Image Section */}
        <div className="support-image hidden md:flex items-center justify-end w-full md:w-1/3">
          <img
            src="./images/support.jpg"
            alt="support"
            className="w-64 h-64 object-cover" // Maintain size
          />
        </div>
      </div>
    </div>
  );
}

export default Support;
