import React from "react";

const ContractCard = ({ contract, role }) => {
  // Access nested contract data
  const contractData = contract.contract;

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      {/* Accessing contract fields */}
      <h3 className="text-xl font-bold mb-2">{contractData.contractTitle}</h3>
      <p className="text-gray-600 mb-2">
        Payment: ${contractData.paymentAmount}
      </p>
      <p className="text-gray-600 mb-2">Status: {contractData.status}</p>
      <p className="text-gray-600 mb-2">
        {/* Dynamically show engineer or client based on role */}
        {role === "client"
          ? `Engineer ID: ${contractData.engineer}` // You can replace this with full name if available
          : `Client ID: ${contractData.service.client}`}{" "}
        {/* Replace with full name if available */}
      </p>
      <p className="text-gray-600 mb-2">
        Start Date: {new Date(contractData.startDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        End Date: {new Date(contractData.endDate).toLocaleDateString()}
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        View Details
      </button>
    </div>
  );
};

export default ContractCard;
