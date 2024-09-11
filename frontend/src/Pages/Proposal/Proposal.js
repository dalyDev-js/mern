import React from 'react';

function Proposal() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl px-4 py-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 ">My proposals</h2>

        <div className="flex  space-x-4 mb-4">
          <a href="#" className="text-yellow-300 font-medium hover:underline">Active</a>
          <a href="#" className="text-gray-500 font-medium hover:underline">Referrals</a>
          <a href="#" className="text-gray-500 font-medium hover:underline">Archived</a>
        </div>

     
        <div className="space-y-4">
          <div className="border rounded-md p-4 flex justify-between items-center bg-gray-100">
            <span>Offers (0)</span>
          </div>
          <div className="border rounded-md p-4 flex justify-between items-center bg-gray-100">
            <span>Invitations to interview (0)</span>
            <button className="text-yellow-300 text-xl">+</button>
          </div>
          <div className="border rounded-md p-4 flex justify-between items-center bg-gray-100">
            <span>Active proposals (0)</span>
          </div>
          <div className="border rounded-md p-4 flex justify-between items-center bg-gray-100">
            <span>Submitted proposals (0)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proposal;