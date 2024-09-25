import axios from "axios";

// Initial state
const initialState = {
  loading: false,
  token: null,
  user: null,
  error: null,
};

// Action types
const AUTH_REQUEST = "auth/AUTH_REQUEST";
const AUTH_SUCCESS = "auth/AUTH_SUCCESS";
const AUTH_FAILURE = "auth/AUTH_FAILURE";
const LOGOUT = "auth/LOGOUT";
const CLEAR_ERROR = "auth/CLEAR_ERROR"; // Add CLEAR_ERROR action type

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case AUTH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, token: null, user: null, error: null };
    case CLEAR_ERROR: // Handle CLEAR_ERROR action
      return { ...state, error: null };
    default:
      return state;
  }
};

// Action creators for sign-up and sign-in
export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/signup", // Use your API URL
      formData
    );
    const { token, data: user } = response.data;

    dispatch({
      type: AUTH_SUCCESS,
      payload: { token, user },
    });

    return { payload: { token, user } }; // Explicitly return success
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
      payload:
        error.response?.data?.message || "Sign Up failed. Please try again.",
    });

    return { payload: { error: error.response?.data?.message } }; // Return error
  }
};

export const signIn = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/signin",
      formData
    );
    const { token, data: user } = response.data; // Extract 'user' from 'data'

    // Save token and user to localStorage
    localStorage.setItem("Token", token);
    localStorage.setItem("User", JSON.stringify(user));

    // Dispatch success action
    dispatch({
      type: AUTH_SUCCESS,
      payload: { token, user },
    });

    // Return the payload to be used in the component
    return { payload: { token, user } }; // Return token and user
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
      payload:
        error.response?.data?.message || "Sign In failed. Please try again.",
    });

    return { error: error.response?.data?.message }; // Return error message
  }
};

// Logout action
export const logout = () => (dispatch) => {
  // Remove token and user from localStorage
  localStorage.removeItem("Token");
  localStorage.removeItem("User");

  // Optionally call backend logout route if needed
  axios.delete("http://localhost:8000/api/v1/auth/logout");

  // Dispatch the logout action to clear Redux state
  dispatch({ type: LOGOUT });
  console.log("logged out");
};

// Action to clear error
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR }); // Dispatch the CLEAR_ERROR action
};

export default authReducer;
