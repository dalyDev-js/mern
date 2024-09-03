import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function Slider() {
  return (
    <div className="slider py-14">
      <div className="container mx-auto px-4 lg:px-0">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={40}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            867: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
          className="swiper-container"
        >
          <SwiperSlide>
            <div className="card flex flex-col max-w-md mx-auto rounded-lg overflow-hidden">
              <div className="content p-8 flex flex-col items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Carol Taylor
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  Director of Content Experience
                </p>
                <p className="text-md text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <hr className="w-full mb-6 border-gray-300" />
                <div className="bottom w-full grid grid-cols-2 gap-6">
                  <div className="first">
                    <h4 className="text-lg font-bold text-gray-800">
                      Emmy Winning
                    </h4>
                    <span className="text-sm text-gray-600">
                      Facebook Watch program
                    </span>
                  </div>
                  <div className="second">
                    <h4 className="text-lg font-bold text-gray-800">
                      Millions
                    </h4>
                    <span className="text-sm text-gray-600">
                      of impressions generated
                    </span>
                  </div>
                </div>
              </div>
              <div className="image w-full h-64">
                <img
                  src="./images/home-slider1.jpg"
                  alt="Engineer"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="card flex flex-col max-w-md mx-auto rounded-lg overflow-hidden">
              <div className="image w-full h-64">
                <img
                  src="./images/home-slider2.jpg"
                  alt="Engineer"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="content p-8 flex flex-col items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Carol Taylor
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  Director of Content Experience
                </p>
                <p className="text-md text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <hr className="w-full mb-6 border-gray-300" />
                <div className="bottom w-full grid grid-cols-2 gap-6">
                  <div className="first">
                    <h4 className="text-lg font-bold text-gray-800">
                      Emmy Winning
                    </h4>
                    <span className="text-sm text-gray-600">
                      Facebook Watch program
                    </span>
                  </div>
                  <div className="second">
                    <h4 className="text-lg font-bold text-gray-800">
                      Millions
                    </h4>
                    <span className="text-sm text-gray-600">
                      of impressions generated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card flex flex-col max-w-md mx-auto rounded-lg overflow-hidden">
              <div className="content p-8 flex flex-col items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Carol Taylor
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  Director of Content Experience
                </p>
                <p className="text-md text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <hr className="w-full mb-6 border-gray-300" />
                <div className="bottom w-full grid grid-cols-2 gap-6">
                  <div className="first">
                    <h4 className="text-lg font-bold text-gray-800">
                      Emmy Winning
                    </h4>
                    <span className="text-sm text-gray-600">
                      Facebook Watch program
                    </span>
                  </div>
                  <div className="second">
                    <h4 className="text-lg font-bold text-gray-800">
                      Millions
                    </h4>
                    <span className="text-sm text-gray-600">
                      of impressions generated
                    </span>
                  </div>
                </div>
              </div>
              <div className="image w-full h-64">
                <img
                  src="./images/home-slider3.jpg"
                  alt="Engineer"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card flex flex-col max-w-md mx-auto rounded-lg overflow-hidden">
              <div className="image w-full h-64">
                <img
                  src="./images/home-slider4.jpg"
                  alt="Engineer"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="content p-8 flex flex-col items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Carol Taylor
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  Director of Content Experience
                </p>
                <p className="text-md text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <hr className="w-full mb-6 border-gray-300" />
                <div className="bottom w-full grid grid-cols-2 gap-6">
                  <div className="first">
                    <h4 className="text-lg font-bold text-gray-800">
                      Emmy Winning
                    </h4>
                    <span className="text-sm text-gray-600">
                      Facebook Watch program
                    </span>
                  </div>
                  <div className="second">
                    <h4 className="text-lg font-bold text-gray-800">
                      Millions
                    </h4>
                    <span className="text-sm text-gray-600">
                      of impressions generated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card flex flex-col max-w-md mx-auto rounded-lg overflow-hidden">
              <div className="content p-8 flex flex-col items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Carol Taylor
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  Director of Content Experience
                </p>
                <p className="text-md text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <hr className="w-full mb-6 border-gray-300" />
                <div className="bottom w-full grid grid-cols-2 gap-6">
                  <div className="first">
                    <h4 className="text-lg font-bold text-gray-800">
                      Emmy Winning
                    </h4>
                    <span className="text-sm text-gray-600">
                      Facebook Watch program
                    </span>
                  </div>
                  <div className="second">
                    <h4 className="text-lg font-bold text-gray-800">
                      Millions
                    </h4>
                    <span className="text-sm text-gray-600">
                      of impressions generated
                    </span>
                  </div>
                </div>
              </div>
              <div className="image w-full h-64">
                <img
                  src="./images/home-slider5.jpg"
                  alt="Engineer"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card flex flex-col max-w-md mx-auto rounded-lg overflow-hidden">
              <div className="image w-full h-64">
                <img
                  src="./images/engineer-silder.jpg"
                  alt="Engineer"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="content p-8 flex flex-col items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Carol Taylor
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  Director of Content Experience
                </p>
                <p className="text-md text-gray-700 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <hr className="w-full mb-6 border-gray-300" />
                <div className="bottom w-full grid grid-cols-2 gap-6">
                  <div className="first">
                    <h4 className="text-lg font-bold text-gray-800">
                      Emmy Winning
                    </h4>
                    <span className="text-sm text-gray-600">
                      Facebook Watch program
                    </span>
                  </div>
                  <div className="second">
                    <h4 className="text-lg font-bold text-gray-800">
                      Millions
                    </h4>
                    <span className="text-sm text-gray-600">
                      of impressions generated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <div className="slider_controler mt-8 flex justify-center items-center space-x-6">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
