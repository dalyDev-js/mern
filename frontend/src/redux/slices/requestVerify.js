import axios from "axios";

// Initial state
const initialState = {
  loading: false,
  verificationRequested: false,
  error: null,
};

// Action types
const VERIFICATION_REQUEST = "verification/VERIFICATION_REQUEST";
const VERIFICATION_SUCCESS = "verification/VERIFICATION_SUCCESS";
const VERIFICATION_FAILURE = "verification/VERIFICATION_FAILURE";

// Action types for updating verification status
const UPDATE_VERIFICATION_STATUS = "verification/UPDATE_VERIFICATION_STATUS";

// Action creator for updating verification status to 'pending'
export const updateVerificationStatus =
  (userId, status) => async (dispatch) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/verify/user/${userId}`, {
        status,
      });

      // Dispatch an action to update the verification status in the store
      dispatch({
        type: UPDATE_VERIFICATION_STATUS,
        payload: status,
      });
    } catch (error) {
      dispatch({
        type: VERIFICATION_FAILURE,
        payload:
          error.response?.data?.message ||
          "Failed to update verification status.",
      });
    }
  };

// Reducer
const verificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_REQUEST:
      return { ...state, loading: true, error: null };
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        verificationRequested: true,
        error: null,
      };
    case VERIFICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_VERIFICATION_STATUS:
      return { ...state, verifiedStatus: action.payload };
    default:
      return state;
  }
};
// Action creator for requesting verification
export const requestVerification = (userId, file) => async (dispatch) => {
  dispatch({ type: VERIFICATION_REQUEST });

  try {
    const data = new FormData();
    data.append("image", file);
    data.append("userId", userId);
    // Make the request to the backend with userId
    const response = await axios.post(
      "http://localhost:8000/api/v1/requestVerify",
      data
    );

    dispatch({
      type: VERIFICATION_SUCCESS,
    });

    return response.data; // Return the success response
  } catch (error) {
    dispatch({
      type: VERIFICATION_FAILURE,
      payload:
        error.response?.data?.message || "Request failed. Please try again.",
    });

    return { error: error.response?.data?.message }; // Return error
  }
};

export default verificationReducer;
