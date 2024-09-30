import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchContractById } from "../../redux/slices/contractSlice"; // Fetch contract by ID action
import { fetchUserById } from "../../redux/slices/userSlice"; // Fetch user by ID action

const ContractDetails = () => {
  const { id } = useParams(); // Contract ID from URL
  const dispatch = useDispatch();

  // Local state for contract, client name, and engineer name
  const [contract, setContract] = useState(null);
  const [clientName, setClientName] = useState("Loading...");
  const [engineerName, setEngineerName] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // role
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch contract details by ID
        const contractResponse = await dispatch(fetchContractById(id)).unwrap();
        setContract(contractResponse);

        // Fetch client name by user ID
        if (contractResponse.service.client) {
          const clientResponse = await dispatch(
            fetchUserById(contractResponse.service.client)
          ).unwrap();
          setClientName(clientResponse.fullName || "N/A");
        }

        // Fetch engineer name by user ID
        if (contractResponse.engineer.user) {
          const engineerResponse = await dispatch(
            fetchUserById(contractResponse.engineer.user)
          ).unwrap();
          setEngineerName(engineerResponse.fullName || "N/A");
        }
        // Fetch user role
        // const user = await dispatch(fetchUserById(id));
        // // Set user role
        // setUserRole(role);

        // Fetch user role based on the logged-in user or contract details
        const userResponse = await dispatch(fetchUserById(id)).unwrap();
        setUserRole(userResponse.role); // Make sure to set role here

        ///////////////////////////
      } catch (err) {
        setError(err.message || "Failed to load contract details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading contract details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600">Error loading contract details: {error}</p>
    );
  }

  return (
    <div className="contract-details p-6 h-screen">
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
            <strong>Client:</strong> {clientName}
          </p>

          {/* Engineer Name */}
          <p>
            <strong>Engineer:</strong> {engineerName}
          </p>

          {/* Role  */}
          {userRole && (
            <p>
              <strong>Role:</strong> {userRole}
            </p>
          )}

          {/* Conditional "user Role" for client or engineer */}
          {userRole === "client" ? (
            <>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Edit Contract
              </button>

              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Delete Contract
              </button>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                Add Payment
              </button>
            </>
          ) : userRole === "engineer" ? (
            <>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                accepte Contract
              </button>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Reject Contract
              </button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ContractDetails;
