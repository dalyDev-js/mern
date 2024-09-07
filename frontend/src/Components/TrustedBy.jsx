function TrustedBy() {
  return (
    <div className="trusted-by    ">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center md:items-start">
        <h1 className="text-lg md:text-xl mb-4 font-medium">Trusted by</h1>
        <div className="trusted-by-logo flex flex-wrap justify-center gap-4 sm:gap-6">
          <img
            className="h-6 sm:h-8 md:h-10"
            src="./images/Ms-logo.png"
            alt="Microsoft"
          />
          <img
            className="h-6 sm:h-8 md:h-10"
            src="./images/airbnb.png"
            alt="Airbnb"
          />
          <img
            className="h-6 sm:h-8 md:h-10"
            src="./images/Bissell_logo.png"
            alt="Bissell"
          />
        </div>
      </div>
    </div>
  );
}

export default TrustedBy;
