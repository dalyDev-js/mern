import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContractById } from "../../redux/slices/contractSlice"; // Fetch contract by ID action
import { fetchUserById } from "../../redux/slices/userSlice"; // Fetch user by ID action

const ContractDetails = () => {
  const { id } = useParams(); // Contract ID from URL
  const dispatch = useDispatch();

  // Redux states for contract, client, and engineer
  const {
    selectedContract: contract,
    status: contractStatus,
    error: contractError,
  } = useSelector((state) => state.contract);

  const { selectedUser: client, status: clientStatus } = useSelector(
    (state) => state.user
  );
  const { selectedUser: engineer, status: engineerStatus } = useSelector(
    (state) => state.user
  );

  const [clientFetched, setClientFetched] = useState(false);
  const [engineerFetched, setEngineerFetched] = useState(false);

  useEffect(() => {
    // Fetch contract details by ID
    dispatch(fetchContractById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (contract && contract.service && contract.engineer) {
      // Fetch client details if not already fetched and client data is not present
      if (!clientFetched && clientStatus !== "succeeded" && !client) {
        dispatch(fetchUserById(contract.service.client)); // Fetch client by userId
        setClientFetched(true); // Mark client fetch as done
      }

      // Fetch engineer details if not already fetched and engineer data is not present
      if (!engineerFetched && engineerStatus !== "succeeded" && !engineer) {
        dispatch(fetchUserById(contract.engineer.user)); // Fetch engineer by userId
        setEngineerFetched(true); // Mark engineer fetch as done
      }
    }
  }, [
    contract,
    clientFetched,
    engineerFetched,
    dispatch,
    clientStatus,
    engineerStatus,
    client,
    engineer,
  ]);

  if (contractStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading contract details...</p>
      </div>
    );
  }

  if (contractStatus === "failed" || contractError) {
    return <p>Error loading contract details: {contractError}</p>;
  }

  return (
    <div className="contract-details p-6">
      <h1 className="text-2xl font-bold">Contract Details</h1>
      {contract && (
        <>
          <p>
            <strong>Contract Title:</strong> {contract.contractTitle}
          </p>
          <p>
            <strong>Description:</strong> {contract.description}
          </p>
          <p>
            <strong>Payment Amount:</strong> ${contract.paymentAmount}
          </p>
          <p>
            <strong>Payment Option:</strong> {contract.paymentOption}
          </p>
          <p>
            <strong>Status:</strong> {contract.status}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(contract.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(contract.endDate).toLocaleDateString()}
          </p>

          {/* Client Name */}
          <p>
            <strong>Client:</strong>{" "}
            {clientStatus === "loading"
              ? "Loading..."
              : client?.fullName || "N/A"}
          </p>

          {/* Engineer Name */}
          <p>
            <strong>Engineer:</strong>{" "}
            {engineerStatus === "loading"
              ? "Loading..."
              : engineer?.fullName || "N/A"}
          </p>
        </>
      )}
    </div>
  );
};

export default ContractDetails;
