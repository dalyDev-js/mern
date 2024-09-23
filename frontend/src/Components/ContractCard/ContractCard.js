import React from "react";
import { Link } from "react-router-dom";

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
        {/* {role === "client"
          ? `Engineer ID: ${contractData.engineer}` // You can replace this with full name if available
          : `Client ID: ${contractData.service.client}`}{" "} */}
      </p>
      <p className="text-gray-600 mb-2">
        Start Date: {new Date(contractData.startDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        End Date: {new Date(contractData.endDate).toLocaleDateString()}
      </p>
      <Link to={`/contract/${contract.contract._id}`}>
        <button className="mt-4 px-4 py-2 bg-amber-300 text-black rounded">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ContractCard;
