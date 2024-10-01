import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchContractById,
  updateContract,
} from "../../redux/slices/contractSlice";
import { fetchUserById } from "../../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { Modal } from "../../Components/Modal/Modal";

const ContractDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contract, setContract] = useState(null);
  const [clientName, setClientName] = useState("Loading...");
  const [engineerName, setEngineerName] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);
  const [confirmingCompletion, setConfirmingCompletion] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false); // To show "Make Payment" button
  const [disableConfirmCompleted, setDisableConfirmCompleted] = useState(false); // Disable confirm button once clicked

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    setUserRole(userRole);

    const fetchDetails = async () => {
      try {
        const contractResponse = await dispatch(fetchContractById(id)).unwrap();
        setContract(contractResponse);

        const clientResponse = await dispatch(
          fetchUserById(contractResponse.service.client)
        ).unwrap();
        setClientName(clientResponse.fullName || "N/A");

        const engineerResponse = await dispatch(
          fetchUserById(contractResponse.engineer.user)
        ).unwrap();
        setEngineerName(engineerResponse.fullName || "N/A");
      } catch (err) {
        setError(err.message || "Failed to load contract details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, dispatch, statusChanged]);

  const handleUpdateContract = (updatedData) => {
    dispatch(updateContract({ contractId: id, updatedData }))
      .unwrap()
      .then(() => {
        setIsModalOpen(false);
        setStatusChanged(!statusChanged);
      })
      .catch((err) => {
        setError("Error updating contract: " + err.message);
      });
  };

  const handleRequestCompletion = () => {
    openModal("requestCompletion");
  };

  const handleConfirmCompletion = () => {
    setConfirmingCompletion(true);
    handleUpdateContract({ status: "completed", requestCompletion: false });
    setConfirmingCompletion(false);
    setShowPaymentButton(true); // Show "Make Payment" button after completion is confirmed
    setDisableConfirmCompleted(true); // Disable confirm button after clicking
  };

  const openModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

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
    <div className="contract-details p-6 h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contract Details</h1>
        {contract && (
          <>
            <p className="text-lg mb-2">
              <strong>Contract Title:</strong> {contract.contractTitle}
            </p>
            <p className="text-lg mb-2">
              <strong>Description:</strong> {contract.description}
            </p>
            <p className="text-lg mb-2">
              <strong>Payment Amount:</strong> ${contract.paymentAmount}
            </p>
            <p className="text-lg mb-2">
              <strong>Payment Option:</strong> {contract.paymentOption}
            </p>
            <p className="text-lg mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  contract.status === "active"
                    ? "bg-green-200 text-green-800"
                    : contract.status === "canceled"
                    ? "bg-red-200 text-red-800"
                    : contract.status === "completed"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}>
                {contract.status}
              </span>
            </p>
            <p className="text-lg mb-2">
              <strong>Start Date:</strong>{" "}
              {new Date(contract.startDate).toLocaleDateString()}
            </p>
            <p className="text-lg mb-2">
              <strong>End Date:</strong>{" "}
              {new Date(contract.endDate).toLocaleDateString()}
            </p>
            <p className="text-lg mb-2">
              <strong>Client:</strong> {clientName}
            </p>
            <p className="text-lg mb-2">
              <strong>Engineer:</strong> {engineerName}
            </p>

            <div className="mt-6 flex space-x-4">
              {/* Engineer sees Accept and Reject when contract is pending */}
              {userRole === "engineer" && contract.status === "pending" && (
                <>
                  <button
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => openModal("active")}>
                    Accept Contract
                  </button>
                  <button
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => openModal("canceled")}>
                    Reject Contract
                  </button>
                </>
              )}

              {/* Client sees Cancel when contract is pending */}
              {userRole === "client" && contract.status === "pending" && (
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => openModal("canceled")}>
                  Cancel Contract
                </button>
              )}

              {/* Engineer requests completion when contract is active */}
              {userRole === "engineer" &&
                contract.status === "active" &&
                !contract.requestCompletion && (
                  <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleRequestCompletion}>
                    Request Completion
                  </button>
                )}

              {/* Client confirms completion if requested */}
              {userRole === "client" && contract.requestCompletion && (
                <button
                  className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
                    confirmingCompletion ? "opacity-50" : ""
                  }`}
                  onClick={handleConfirmCompletion}
                  disabled={disableConfirmCompleted}>
                  Confirm Completed
                </button>
              )}

              {/* After confirmation, show "Make Payment" button */}
              {showPaymentButton && (
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => navigate("/payment")}>
                  Make Payment
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          if (modalAction === "requestCompletion") {
            handleUpdateContract({ requestCompletion: true });
          } else {
            handleUpdateContract({ status: modalAction });
          }
        }}
        title={`Confirm ${
          modalAction === "active"
            ? "Acceptance"
            : modalAction === "requestCompletion"
            ? "Request Completion"
            : "Cancellation"
        }`}
        message={`Are you sure you want to ${
          modalAction === "active"
            ? "accept"
            : modalAction === "requestCompletion"
            ? "request completion for"
            : "cancel"
        } this contract?`}
        confirmButtonStyle={
          modalAction === "canceled" || modalAction === "reject"
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }
      />
    </div>
  );
};

export default ContractDetails;
