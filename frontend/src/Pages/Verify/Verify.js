import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestVerification } from "../../redux/slices/requestVerify";
import { fetchUserById } from "../../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";

const Verify = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [country, setCountry] = useState("Egypt");
  const [docFile, setDocFile] = useState(null);

  const [step, setStep] = useState(1);
  const [isVerificationPending, setIsVerificationPending] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const dispatch = useDispatch();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("Token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId || decodedToken.id;
    }
    return null;
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userId = getUserIdFromToken();

      if (userId) {
        const userData = await dispatch(fetchUserById(userId));
        const verifiedStatus = userData.payload.verifiedStatus;
        const requested = userData.payload.requestVerifiedStatus;

        if (verifiedStatus && verifiedStatus.includes("pending") && requested) {
          setIsVerificationPending(true);
        }
        if (
          verifiedStatus &&
          verifiedStatus.includes("rejected") &&
          requested
        ) {
          setIsVerificationPending(true);
        }
      } else {
        console.error("No user ID found in the token");
      }
    };

    loadUserData();
  }, [dispatch]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleContinue = () => {
    if (!selectedOption || !country) {
      alert("Please select a country and ID type.");
      return;
    }
    setStep(2);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
    console.log(file, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    setDocFile(file);
  };

  const handleRequestVerification = () => {
    const userId = getUserIdFromToken();
    console.log(docFile, "ggggggggggggggggggggggg");
    if (userId) {
      dispatch(requestVerification(userId, docFile)).then((res) => {
        if (res.error) {
          console.error("Error requesting verification:", res.error);
        } else {
          setIsSuccessModalVisible(true);
        }
      });
    }
  };

  const handleSuccessModalOkClick = () => {
    setIsSuccessModalVisible(false);
    setIsVerificationPending(true);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md">
      {isSuccessModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-35">
          <div
            className="bg-white p-6 w-1/3 rounded-lg shadow-md text-center transition-all duration-300 ease-out transform scale-100 opacity-100"
            style={{
              animation: "fadeInScale 0.3s ease-out",
            }}
          >
            <div className="flex justify-center mb-4">
              <i className="text-4xl text-green-500 fa-solid fa-check-circle"></i>
            </div>
            <p className="text-2xl font-semibold mb-2">Success</p>
            <p className="text-gray-600 mb-4">
              Your document has been uploaded. It will take up to 2 hours to
              review and verify your account. Please be patient while we
              complete the process.
            </p>
            <button
              onClick={handleSuccessModalOkClick}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {isVerificationPending ? (
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-4">
            Your verification process is pending...
          </p>
          <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          <p className="text-gray-600 mt-4">
            Please wait while we complete the review and verification process.
          </p>
        </div>
      ) : (
        <>
          <nav className="text-gray-700 text-sm mb-6">
            <ul className="flex">
              <li className={`mr-2 ${step === 1 ? "font-bold" : ""}`}>
                <button onClick={handleBack} className="hover:underline">
                  Choose ID Type
                </button>
              </li>
              <span className="mr-2">/</span>
              <li className={`mr-2 ${step === 2 ? "font-bold" : ""}`}>
                Upload Document
              </li>
            </ul>
          </nav>

          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold mb-4">
                Choose your type of identification document
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                We will only use the information you enter to verify who you
                are, and we'll only hold onto it until your account issue is
                resolved.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose the country that issued your identification document:
                </label>
                <select
                  value={country}
                  onChange={handleCountryChange}
                  className={`w-full border-2 p-2 rounded-lg focus:outline-none focus:border-amber-300 ${
                    country ? "border-amber-300" : "border-gray-300"
                  }`}
                >
                  <option value="Egypt">Egypt</option>
                  <option value="UAE">UAE</option>
                  <option value="USA">USA</option>
                </select>
              </div>

              <h3 className="text-lg font-semibold mb-4">Select ID type</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer ${
                    selectedOption === "passport"
                      ? "border-amber-300"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleOptionSelect("passport")}
                >
                  <div className="flex justify-center mb-2">
                    <img
                      src="/images/passport.png"
                      alt="Passport"
                      className="h-20 w-auto"
                    />
                  </div>
                  <div className="text-center">
                    <p>Passport</p>
                  </div>
                </div>
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer ${
                    selectedOption === "idCard"
                      ? "border-amber-300"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleOptionSelect("idCard")}
                >
                  <div className="flex justify-center mb-2">
                    <img
                      src="/images/id-card.png"
                      alt="Identity card"
                      className="h-20 w-auto"
                    />
                  </div>
                  <div className="text-center">
                    <p>Identity card</p>
                  </div>
                </div>
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer ${
                    selectedOption === "driversLicense"
                      ? "border-amber-300"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleOptionSelect("driversLicense")}
                >
                  <div className="flex justify-center mb-2">
                    <img
                      src="/images/driving-license-icon.png"
                      alt="Driver's license"
                      className="h-20 w-auto"
                    />
                  </div>
                  <div className="text-center">
                    <p>Driver’s license</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => console.log("Go back")}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContinue}
                  className="bg-amber-300 text-black py-2 px-4 rounded-lg hover:bg-amber-400"
                >
                  Continue
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">
                Please upload your {selectedOption}
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload your {selectedOption} document:
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="w-full border-2 p-2 rounded-xl border-gray-300 cursor-pointer file:rounded-lg file:bg-amber-300 file:text-black file:py-2 file:px-4 file:border-none file:cursor-pointer file:pl-22"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleRequestVerification}
                  className="bg-amber-300 text-black py-2 px-6 rounded-lg hover:bg-amber-400"
                >
                  Request Verification
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Verify;
