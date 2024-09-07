import React from "react";
import CustomerSupportImage from "../../assets/CustomerSupport.svg";
import SolutionsImage from "../../assets/Solutions.svg";
import PressImage from "../../assets/PressInquiries.svg";
import MapImage from "../../assets/Map.png";

const ContactUs = () => {
  return (
    <>
      <div className="py-16">
        <div className="flex flex-col items-start ml-60 bg-white  ">
          <h1 className="text-4xl font-medium  text-amber-300 mb-3">
            Contact us
          </h1>
          <p className="text-xl font-medium pl-1">Reach out anytime</p>
        </div>

        <div className="flex flex-col  bg-white py-5 px-6 ml-20 ">
          <div className="flex flex-col items-center bg-white py-5 px-6">
            {/* cards Section   */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Support */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col">
                <span className="flex gap-4">
                  <h2 className="text-lg font-semibold mb-1">
                    Customer Support
                  </h2>
                  <img
                    src={CustomerSupportImage}
                    alt="Customer Support"
                    className="mb-2 w-28 h-16"
                  />
                </span>

                <p class="text-gray-500 dark:text-gray-400">
                  <a
                    href="#"
                    class="inline-flex items-center underline text-sm  text-amber-400 hover:text-amber-500 dark:text-amber-500 "
                  >
                    Visit Help Center
                    <svg
                      class="w-2 h-2 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </p>
              </div>

              {/* Enterprise Solutions */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col">
                <span className="flex gap-4">
                  <h2 className="text-lg font-semibold mb-1">
                    Enterprise Solutions
                  </h2>
                  <img
                    src={SolutionsImage}
                    alt="Enterprise Solutions"
                    className="mb-2 w-28 h-16"
                  />
                </span>

                <p class="text-gray-500 dark:text-gray-400">
                  <a
                    href="#"
                    class="inline-flex items-center underline text-sm text-amber-400 hover:text-amber-500 dark:text-amber-500 "
                  >
                    866.262.4478
                    <svg
                      class="w-2 h-2 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </p>
              </div>

              {/* Press Inquiries */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col">
                <span className="flex gap-10">
                  <h2 className="text-lg font-semibold mb-1">
                    Press Inquiries
                  </h2>
                  <img
                    src={PressImage}
                    alt="Press Inquiries"
                    className="mb-2 w-28 h-16"
                  />
                </span>

                <p class="text-gray-500 dark:text-gray-400">
                  <a
                    href="#"
                    class="inline-flex items-center underline text-sm text-amber-400 hover:text-amber-500 dark:text-amber-500"
                  >
                    press@example.com
                    <svg
                      class="w-2 h-2 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </p>
              </div>
            </div>

            {/* Offices Section */}

            <div className=" py-8 mt-8">
              <div className="max-w-4xl mx-auto  sm:px-6 lg:px-8">
                <h1 className="text-3xl font-medium text-gray-800 mb-5">
                  Our Offices
                </h1>
                {/* Cairo */}
                <div className="flex items-center bg-gray-50 shadow-sm rounded-lg p-2 mb-8">
                  <div className="w-1/3">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={MapImage}
                      alt="Location"
                    />
                  </div>

                  <div className="ml-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Cairo
                    </h2>
                    <p className="text-gray-600">
                      Ring Road , New Cairo , Cairo ,Egypt
                    </p>
                    <p className="text-gray-600">Phone: 010 000 000 01</p>
                  </div>
                </div>
                {/* Maadi Office */}
                <div className="flex items-center bg-gray-50 shadow-sm rounded-lg p-2 mb-8">
                  <div className="w-1/3">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={MapImage}
                      alt="Location"
                    />
                  </div>

                  <div className="ml-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Maadi Office
                    </h2>
                    <p className="text-gray-600">Maadi st, Cairo , Egypt</p>
                    <p className="text-gray-600">Phone: 012 000 000 02</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

// // Reusable component for office locations
// const OfficeCard = ({ imgSrc, title, address, phone }) => (
//   <div className="flex items-center bg-white shadow-md rounded-lg p-6 mb-8">
//     <div className="w-1/3">
//       <img
//         className="w-full h-full object-cover rounded-lg"
//         src={imgSrc}
//         alt={`${title} Location`}
//       />
//     </div>
//     <div className="ml-6">
//       <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//       <p className="text-gray-600">{address}</p>
//       {phone && <p className="text-gray-600">Phone: {phone}</p>}
//     </div>
//   </div>
// );

// const ContactUs = () => {
//   return (
//     <>
//       {/* Contact Us Section */}
//       <div className="flex flex-col bg-white py-12 px-6 ml-20">
//         <div className="flex flex-col items-center bg-white py-12 px-6">
//           <h1 className="text-4xl items-start font-medium text-blue-600 mb-8">
//             Contact us
//           </h1>
//           <p className="text-xl font-medium mb-10">Reach out anytime</p>

//           {/* Contact Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Customer Support */}
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
//               <span className="flex gap-8">
//                 <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
//                 <img
//                   src={CustomerSupportImage}
//                   alt="Customer Support"
//                   className="mb-4 w-25 h-20"
//                 />
//               </span>
//               <a
//                 href="https://helpcenter.example.com"
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 Visit Help Center →
//               </a>
//             </div>

//             {/* Enterprise Solutions */}
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
//               <span className="flex gap-8">
//                 <h2 className="text-xl font-semibold mb-2">
//                   Enterprise Solutions
//                 </h2>
//                 <img
//                   src={SolutionsImage}
//                   alt="Enterprise Solutions"
//                   className="mb-4 w-25 h-20"
//                 />
//               </span>
//               <a
//                 href="tel:8662624478"
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 866.262.4478 →
//               </a>
//             </div>

//             {/* Press Inquiries */}
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
//               <span className="flex gap-8">
//                 <h2 className="text-xl font-semibold mb-2">Press Inquiries</h2>
//                 <img
//                   src={PressImage}
//                   alt="Press Inquiries"
//                   className="mb-4 w-25 h-20"
//                 />
//               </span>
//               <a
//                 href="mailto:press@example.com"
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 press@example.com →
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Office Locations Section */}
//       <div className="bg-gray-100 py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Offices</h1>

//           {/* Global HQ */}
//           <OfficeCard
//             imgSrc={MapImage}
//             title="Global HQ"
//             address="475 Brannan St. Suite 430, San Francisco, CA 94107"
//             phone="(650) 316-7500"
//           />

//           {/* Chicago Office */}
//           <OfficeCard
//             imgSrc={MapImage}
//             title="Chicago Office"
//             address="525 W. Van Buren Suite #100, Chicago, IL 60607"
//           />
//           <div className="flex items-center bg-white shadow-md rounded-lg p-6 mb-8">
//             <div className="w-1/3">
//               <img
//                 className="w-full h-full object-cover rounded-lg"
//                 src={MapImage}
//                 alt="Location"
//               />
//             </div>
//             <div className="ml-6">
//               <h2 className="text-xl font-semibold text-gray-800">title</h2>
//               <p className="text-gray-600">address</p>
//               <p className="text-gray-600">Phone: phone</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUs;

// <div className="bg-gray-100 py-12">
// <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//   <h1 className="text-3xl font-bold text-gray-800 mb-8">
//     Our Offices
//   </h1>

{
  /* Global HQ */
}
{
  /* </div></div> <div className="flex items-center bg-white shadow-md rounded-lg p-6 mb-8"> */
}
{
  /* Location Image */
}
{
  /* <div className="w-1/2">
      <img
        className="w-full h-full object-cover rounded-lg"
        src="/path/to/map-image1.jpg"
        alt="Global HQ Location"
      />
    </div> */
}

{
  /* Office Info */
}
{
  /* <div className="ml-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Global HQ
      </h2>
      <p className="text-gray-600">475 Brannan St. Suite 430</p>
      <p className="text-gray-600">San Francisco, CA 94107</p>
      <p className="text-gray-600">Phone: (650) 316-7500</p>
    </div>
  </div> */
}

{
  /* Chicago Office */
}
{
  /* <div className="flex items-center bg-white shadow-md rounded-lg p-6">
    {/* Location Image */
}
// <div className="w-1/3">
//   <img
//     className="w-full h-full object-cover rounded-lg"
//     src="/path/to/map-image2.jpg"
//     alt="Chicago Office Location"
//   />
// </div>

{
  /* Office Info */
}
{
  /* <div className="ml-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Chicago Office
      </h2>
      <p className="text-gray-600">525 W. Van Buren Suite #100</p>
      <p className="text-gray-600">Chicago, IL 60607</p>
    </div>
  </div>
</div>
</div> */
}
