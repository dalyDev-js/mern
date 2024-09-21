import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
    default:
      return state;
  }
};

// Action creator for requesting verification
export const requestVerification = () => async (dispatch) => {
  dispatch({ type: VERIFICATION_REQUEST });

  try {
    // Get the token from localStorage
    const token = localStorage.getItem("Token");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to extract the userId
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // Assuming the token contains userId as 'id'

    // Make the request to the backend
    const response = await axios.post(
      "http://localhost:8000/api/v1/request-verification",
      { userId }
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
