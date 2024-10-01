import React, { useEffect } from "react";
import { useLoading } from "../../utils/LoadingContext";
import logo from "../../assets/logo.png";

function AboutUs() {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);

    // Simulate loading completion after 1.5 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [setIsLoading]);
  return (
    <div className="flex flex-col bg-white py-10 px-6 ml-20">
      <div className="flex flex-col items-start bg-white py-12 px-6">
        <h1 className="text-4xl font-medium text-amber-300 mb-6">About us</h1>

        {/*  about us Section */}

        <p className="text-s font-normal mb-4 items-center">
          <span className="font text-l font-semibold whitespace-nowrap mr-1">
            at Handesly
          </span>
          , we bridge the gap between skilled civil and architectural engineers
          and businesses seeking top-notch talent for their projects. Our
          platform is designed to connect industry professionals with a variety
          of opportunities, from large-scale infrastructure projects to
          innovative architectural designs. We provide a secure and efficient
          space where clients can find qualified experts to bring their visions
          to life, while engineers can grow their careers by working with global
          teams and contributing to meaningful projects.
        </p>

        <p className="text-md font-semibold text-black ">
          Our mission is to empower engineers by offering a specialized
          marketplace that fosters collaboration, innovation, and growth.
          Whether you&apos;re an engineer seeking freelance work or a company in
          need of the best in the field, we’re here to simplify the hiring
          process and ensure successful partnerships every step of the  way.
        </p>
        {/* cards section text  */}
        <p className="text-xl font-medium mt-8">Meet The Team </p>
        {/* Cards Section */}
        <div className="flex flex-col bg-white py-10 px-6 ">
          <div className="flex flex-col items-center bg-white ">
            <div className="grid grid-cols-1  items-center md:grid-cols-3 gap-10">
              {/* Card 2 */}

              <div className="p-2  bg-gray-50 rounded-lg shadow-inner  dark:bg-gray-800 dark:border-gray-700 mb-3">
                <div className="flex flex-col mb-6 justify-center items-center">
                  <figure className="max-w-lg">
                    <img
                      className="h-[62vh] max-w-full rounded-lg object-contain"
                      src="/images/hosni.jpg"
                      alt="asd asd"
                    />
                    <h2 className="mb-1 mt-2 text-xl text-center font-medium  text-gray-900 dark:text-white">
                      Mohamed Hosni
                    </h2>
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      Fullstack Developer
                    </figcaption>
                  </figure>
                </div>
              </div>
              {/* Card 1 */}
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner  dark:bg-gray-800 dark:border-gray-700 mb-3">
                <div className="flex flex-col mb-6">
                  <figure className="max-w-lg">
                    <img
                      className="h-[62vh] max-w-full rounded-lg"
                      src="/images/don3.jpg"
                      alt="asd asd"
                    />
                    <h2 className="mb-1 mt-2 text-xl text-center font-medium  text-gray-900 dark:text-white">
                      Abdulrhman El-Daly
                    </h2>
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      Fullstack Developer
                    </figcaption>
                  </figure>
                </div>
              </div>
              {/* Card 3 */}
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner  dark:bg-gray-800 dark:border-gray-700 mb-3">
                <div className="flex flex-col mb-6">
                  <figure className="max-w-lg">
                    <img
                      className="h-[62vh] max-w-full rounded-lg"
                      src="/images/hassan.jpg"
                      alt="  description"
                    />
                    <h2 className="mb-1 mt-2 text-xl text-center font-medium  text-gray-900 dark:text-white">
                      Ahmed Hassan
                    </h2>
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      Fullstack Developer
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner  dark:bg-gray-800 dark:border-gray-700 mb-6">
                <div className="flex flex-col mb-2 items-center">
                  <figure className="max-w-lg">
                    <img
                      className="h-[62vh] max-w-full rounded-lg"
                      src="/images/nadaw.jpg"
                      alt="  nada"
                    />
                    <h2 className="mb-1 mt-2 text-xl text-center font-medium  text-gray-900 dark:text-white">
                      Nada Ali
                    </h2>
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      Front-end Developer
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner  dark:bg-gray-800 dark:border-gray-700 mb-6">
                <div className="flex flex-col mb-2 items-center">
                  <figure className="max-w-lg">
                    <img
                      className="h-[62vh] max-w-full rounded-lg"
                      src="/images/saif.jpg"
                      alt="  description"
                    />
                    <h2 className="mb-1 mt-2 text-xl text-center font-medium  text-gray-900 dark:text-white">
                      Mohamed Abosaif
                    </h2>
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      Frontend Developer
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Card 6 */}
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner  dark:bg-gray-800 dark:border-gray-700 mb-6">
                <div className="flex flex-col mb-2 items-center">
                  <figure className="max-w-lg">
                    <img
                      className="h-[62vh] max-w-full rounded-lg"
                      src="/images/nadam.jpg"
                      alt="  description"
                    />
                    <h2 className="mb-1 mt-2 text-xl text-center font-medium  text-gray-900 dark:text-white">
                      Nada Atef
                    </h2>
                    <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                      Frontend Developer
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-medium text-black mb-6">
          Start your journey
        </h1>
        <span className="flex gap-7 ml-3">
          <a
            href="#"
            className="text-black bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-bamber-600 dark:hover:bg-amber-300 focus:outline-none dark:focus:ring-amber-300">
            Find Talent
          </a>
          <a
            href="#"
            className=" text-black bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-amber-600 dark:hover:bg-amber-300 focus:outline-none dark:focus:ring-amber-300">
            Find Work
          </a>
        </span>
      </div>
    </div>
  );
}

export default AboutUs;
