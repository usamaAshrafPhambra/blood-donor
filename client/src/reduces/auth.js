import {
  LOADING,
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
  loading: false,
  user: null,
};

function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
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
        token: payload.token,
        loading: false,
      };
    case SIGNIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
      };
    default:
      return state;
  }
}

export default auth;
