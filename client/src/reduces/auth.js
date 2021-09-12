import {
  SIGNUP_FAIL,
  SIGNUP,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_FAIL,
  SIGNIN,
  LOGOUT_FAIL,
  LOGOUT,
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case SIGNIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuthenticated: null,
        user: null,
      };
    case SIGNUP:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loadding: false,
      };
    case SIGNIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loadding: false,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}

export default auth;
