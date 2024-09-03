function Category() {
  return (
    <div className="category px-6 md:px-16 lg:px-24 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Browse talent by category</h1>
        <p className="text-lg mb-8">
          Looking for Service?{" "}
          <a to="/jobs" className="text-amber-500 hover:underline">
            Browse jobs
          </a>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card bg-[#C1D6E3]  shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Structural Engineer</h3>
            <p className="text-gray-700 mb-4">
              Designs and analyzes structures like buildings and bridges to
              ensure
            </p>
            <div className="flex items-center space-x-2">
              <ion-icon
                name="star-outline"
                className="text-yellow-500"
              ></ion-icon>
              <span className="text-gray-800 font-medium">4.55</span>
            </div>
          </div>

          <div className="card bg-[#E5E5E5] shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Structural Engineer</h3>
            <p className="text-gray-700 mb-4">
              Designs and analyzes structures like buildings and bridges to
              ensure
            </p>
            <div className="flex items-center space-x-2">
              <ion-icon
                name="star-outline"
                className="text-yellow-500"
              ></ion-icon>
              <span className="text-gray-800 font-medium">4.55</span>
            </div>
          </div>
          <div className="card bg-[#C1D6E3] shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Structural Engineer</h3>
            <p className="text-gray-700 mb-4">
              Designs and analyzes structures like buildings and bridges to
              ensure
            </p>
            <div className="flex items-center space-x-2">
              <ion-icon
                name="star-outline"
                className="text-yellow-500"
              ></ion-icon>
              <span className="text-gray-800 font-medium">4.55</span>
            </div>
          </div>
          <div className="card bg-[#E5E5E5] shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Structural Engineer</h3>
            <p className="text-gray-700 mb-4">
              Designs and analyzes structures like buildings and bridges to
              ensure
            </p>
            <div className="flex items-center space-x-2">
              <ion-icon
                name="star-outline"
                className="text-yellow-500"
              ></ion-icon>
              <span className="text-gray-800 font-medium">4.55</span>
            </div>
          </div>
          <div className="card bg-[#C1D6E3] shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Structural Engineer</h3>
            <p className="text-gray-700 mb-4">
              Designs and analyzes structures like buildings and bridges to
              ensure
            </p>
            <div className="flex items-center space-x-2">
              <ion-icon
                name="star-outline"
                className="text-yellow-500"
              ></ion-icon>
              <span className="text-gray-800 font-medium">4.55</span>
            </div>
          </div>
          <div className="card bg-[#E5E5E5] shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Structural Engineer</h3>
            <p className="text-gray-700 mb-4">
              Designs and analyzes structures like buildings and bridges to
              ensure
            </p>
            <div className="flex items-center space-x-2">
              <ion-icon
                name="star-outline"
                className="text-yellow-500"
              ></ion-icon>
              <span className="text-gray-800 font-medium">4.55</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
