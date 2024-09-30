import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { fetchContracts } from "../../redux/slices/contractSlice";
import ContractCard from "../../Components/ContractCard/ContractCard";

const Contract = () => {
  const [userRole, setUserRole] = useState(""); // Role can be client/engineer
  const [statusFilter, setStatusFilter] = useState("all");
  const [contracts, setContracts] = useState([]); // State to hold fetched contracts
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    const userId = decodedToken.id;

    setUserRole(userRole); // Set the user role

    // Fetch contracts based on user role and userId
    const fetchData = async () => {
      try {
        console.log("Fetching contracts...");
        setLoading(true);
        const contractResponse = await dispatch(
          fetchContracts({ role: userRole, userId })
        ).unwrap();
        console.log("Contracts fetched:", contractResponse);
        setContracts(contractResponse); // Set the fetched contracts
        setFilteredContracts(contractResponse); // Initially show all contracts
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setError(error.message || "Failed to load contracts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Ensure contract status filter works correctly
    if (contracts.length > 0) {
      if (statusFilter === "all") {
        setFilteredContracts(contracts);
      } else {
        const filtered = contracts.filter((contract) => {
          const contractStatus = contract?.contract?.status?.toLowerCase(); // Adjusting the reference
          console.log(
            `Filtering by status: ${statusFilter}, Contract Status: ${contractStatus}`
          );
          return contractStatus === statusFilter.toLowerCase();
        });
        console.log("Filtered Contracts:", filtered);
        setFilteredContracts(filtered);
      }
    }
  }, [contracts, statusFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-4">Loading contracts...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">Error loading contracts: {error}</p>;
  }

  return (
    <div className="contracts-page p-6 h-screen my-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Contracts</h1>

      {/* Filter buttons */}
      <div className="filter-tabs mb-6 flex justify-center">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 mx-2 rounded ${
            statusFilter === "all" ? "bg-amber-300 text-black" : "bg-gray-200"
          } hover:bg-amber-400`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter("pending")}
          className={`px-4 py-2 mx-2 rounded ${
            statusFilter === "pending"
              ? "bg-amber-300 text-black"
              : "bg-gray-200"
          } hover:bg-amber-400`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatusFilter("active")}
          className={`px-4 py-2 mx-2 rounded ${
            statusFilter === "active"
              ? "bg-amber-300 text-black"
              : "bg-gray-200"
          } hover:bg-amber-400`}
        >
          Active
        </button>
        <button
          onClick={() => setStatusFilter("completed")}
          className={`px-4 py-2 mx-2 rounded ${
            statusFilter === "completed"
              ? "bg-amber-300 text-black"
              : "bg-gray-200"
          } hover:bg-amber-400`}
        >
          Completed
        </button>
      </div>
      {/*                          ????????????????????????????                          */}
      {/* Contracts list */}
      {/* <div className="contract-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      {filteredContracts.length === 0 ? (
        // div center
        <div className=" w-full flex items-center justify-center my-52  ">
          <div className="text-center ">
            <span className="flex">
              <svg
                class="w-8 h-8 text-gray-800 mr-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <p className="text-2xl md:text-3xl font-medium   mb-4">
                No contracts found
              </p>
            </span>
          </div>
        </div>
      ) : (
        filteredContracts.map((contract) => (
          <>
            <div className="contract-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ContractCard
                key={contract._id}
                contract={contract} // Pass the inner contract object
                role={userRole}
              />
            </div>
          </>
        ))
      )}
      {/* </div> */}
    </div>
  );
};

export default Contract;
