import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto my-20 p-6 bg-white rounded-3xl border shadow-md">
      {/* Top Section with Name and Hire Button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-amber-300"
          />
          <div className="ml-4">
            <h1 className="text-xl font-semibold">Abdulrhman A.</h1>
            <p className="text-gray-600">Giza, Egypt - 6:51 pm local time</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md">
            <span className="text-xl">...</span>
          </button> */}
          <button className="px-10 py-2 bg-amber-300 hover:bg-amber-400 text-black rounded-md">
            <Link to={"/hiring"}>Hire</Link>
          </button>
          <button className="px-4 py-2 text-amber-300 border hover:text-amber-400 hover:border-amber-400 border-amber-300 rounded-md">
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
      {/* Availability */}

      {/* Skills */}
      <div className="mt-6">
        <hr class="solid mb-8"></hr>
        <h2 className="text-lg font-semibold">Skills</h2>
        <ul className="list-disc list-inside">
          <li>User Experience (UX) design</li>
          <li>Front-end frameworks</li>
          <li>Responsive design</li>
          <li>Performance optimization, Testing, and debugging</li>
        </ul>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Languages</h2>
        <ul className="list-disc list-inside">
          <li>English: Fluent</li>
          <li>Arabic: Native or Bilingual</li>
          <li>French: Basic</li>
        </ul>
      </div>

      {/* Linked Accounts */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Linked Accounts</h2>
        <a href="https://github.com/dalydev-js" className="text-green-600">
          GitHub: Abdulrhman El-Daly
        </a>
      </div>

      {/* Portfolio */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="border p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Portfolio" />
            <p className="mt-2">Project 1: Personal Website</p>
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Portfolio" />
            <p className="mt-2">Project 2: Robotics Website</p>
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/150" alt="Portfolio" />
            <p className="mt-2">Project 3: Food Delivery Website</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-6 border rounded-lg p-4 shadow-md my-2">
        <h2 className="text-lg font-semibold">Testimonials</h2>
        <ul className="list-disc list-inside">
          <li>
            "Abdulrhman is a fantastic developer who delivered on time!" -
            Client A
          </li>
          <li>"Great attention to detail and very professional." - Client B</li>
        </ul>
      </div>

      {/* Certifications */}
      <div className="mt-6 border rounded-lg p-4 shadow-md my-2">
        <h2 className="text-lg font-semibold">Certifications</h2>
        <ul className="list-disc list-inside">
          <li>Certified Front-End Developer - FreeCodeCamp</li>
          <li>JavaScript Algorithms and Data Structures - FreeCodeCamp</li>
        </ul>
      </div>

      {/* Education */}
      <div className="mt-6 border rounded-lg p-4 shadow-md my-2">
        <h2 className="text-lg font-semibold">Education</h2>
        <ul className="list-disc list-inside">
          <li>Bachelor of Computer Science - Cairo University</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;

//  display engineer profile with id from redux 22222

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEngineerById } from "../../redux/slices/engineersSlice"; // Import the thunk
// import { useParams, Link } from "react-router-dom";

// const Profile = () => {
//   console.log("helleo");
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   console.log(id);
//   // Get the engineer ID from the URL
//   const { selectedEngineer, status, error } = useSelector(
//     (state) => state.engineerlist
//   );

//   // Fetch the engineer details when the component mounts
//   useEffect(() => {
//     setLoading(true);
//     if (id) {
//       dispatch(fetchEngineerById(id)); // Dispatch the action to fetch engineer details
//     }
//     setLoading(false); // Set loading to false when the fetch is done
//   }, [dispatch, id]);

//   if (loading) {
//     return <p>Loading engineer details...</p>;
//   }
//   // if (status === "loading") {
//   //   return <p>Loading engineer details...</p>;
//   // }

//   // if (status === "failed") {
//   //   return <p>Error: {error}</p>;
//   // }
//   return (
//     <div className="max-w-4xl mx-auto my-20 p-6 bg-white rounded-3xl border shadow-md">
//       {selectedEngineer ? (
//         <>
//           {/* Top Section with Name and Hire Button */}
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <img
//                 src={
//                   selectedEngineer.imgSrc || "https://via.placeholder.com/100"
//                 }
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full border-2 border-amber-300"
//               />
//               <div className="ml-4">
//                 <h1 className="text-xl font-semibold">
//                   {selectedEngineer.name}
//                 </h1>
//                 <p className="text-gray-600">
//                   Giza, Egypt - 6:51 pm local time
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="px-10 py-2 bg-amber-300 hover:bg-amber-400 text-black rounded-md">
//                 <Link to={"/hiring"}>Hire</Link>
//               </button>
//               <button className="px-4 py-2 text-amber-300 border hover:text-amber-400 hover:border-amber-400 border-amber-300 rounded-md">
//                 <i className="fas fa-heart"></i>
//               </button>
//             </div>
//           </div>

//           {/* Skills */}
//           <div className="mt-6">
//             <hr className="solid mb-8"></hr>
//             <h2 className="text-lg font-semibold">Skills</h2>
//             <ul className="list-disc list-inside">
//               {selectedEngineer.skills.map((skill, index) => (
//                 <li key={index}>{skill}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Languages */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold">Languages</h2>
//             <ul className="list-disc list-inside">
//               {selectedEngineer.languages.map((language, index) => (
//                 <li key={index}>{language}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Linked Accounts */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold">Linked Accounts</h2>
//             <a href={selectedEngineer.githubUrl} className="text-green-600">
//               GitHub: {selectedEngineer.githubUsername}
//             </a>
//           </div>

//           {/* Portfolio */}
//           <div className="mt-6">
//             <h2 className="text-lg font-semibold">Portfolio</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
//               {selectedEngineer.portfolio.map((project, index) => (
//                 <div key={index} className="border p-4 rounded-lg shadow-md">
//                   <img
//                     src={project.image || "https://via.placeholder.com/150"}
//                     alt={`Portfolio ${index + 1}`}
//                   />
//                   <p className="mt-2">{project.name}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Testimonials */}
//           <div className="mt-6 border rounded-lg p-4 shadow-md my-2">
//             <h2 className="text-lg font-semibold">Testimonials</h2>
//             <ul className="list-disc list-inside">
//               {selectedEngineer.testimonials.map((testimonial, index) => (
//                 <li key={index}>
//                   "{testimonial.text}" - {testimonial.client}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Certifications */}
//           <div className="mt-6 border rounded-lg p-4 shadow-md my-2">
//             <h2 className="text-lg font-semibold">Certifications</h2>
//             <ul className="list-disc list-inside">
//               {selectedEngineer.certifications.map((cert, index) => (
//                 <li key={index}>{cert}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Education */}
//           <div className="mt-6 border rounded-lg p-4 shadow-md my-2">
//             <h2 className="text-lg font-semibold">Education</h2>
//             <ul className="list-disc list-inside">
//               <li>{selectedEngineer.education}</li>
//             </ul>
//           </div>
//         </>
//       ) : (
//         <p>No engineer details found.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

// updat 333
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEngineerById } from "../../redux/slices/engineersSlice"; // Import the thunk
// import { useParams, Link } from "react-router-dom"; // Assume you have this action for fetching an engineer by id

// function Profile() {
//   const { id } = useParams(); // Extract the id from the URL
//   const dispatch = useDispatch();

//   // Select the engineer details from Redux store
//   const { selectedEngineer, status, error } = useSelector(
//     (state) => state.engineerlist
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchEngineerById(id));
//     }
//   }, [dispatch, id]);

//   if (status === "loading") {
//     return <p>Loading engineer details...</p>;
//   }

//   if (status === "failed") {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="container mx-auto px-20 py-10">
//       {selectedEngineer ? (
//         <div className="border rounded-lg p-5 shadow-md">
//           <img
//             src={selectedEngineer.imgSrc}
//             alt={selectedEngineer.name}
//             className="w-24 h-24 rounded-full"
//           />
//           <h2 className="text-xl font-medium mt-4">{selectedEngineer.name}</h2>
//           <p className="text-gray-500">{selectedEngineer.role}</p>
//           <p className="text-gray-600 mt-2">Rate: {selectedEngineer.rate}</p>
//           <p className="text-gray-600">Rating: {selectedEngineer.rating}</p>
//           <p className="text-gray-600">Jobs: {selectedEngineer.jobs}</p>
//           <div className="mt-2">
//             {selectedEngineer.skills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mr-2">
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>No engineer details found.</p>
//       )}
//     </div>
//   );
// }

// export default Profile;
