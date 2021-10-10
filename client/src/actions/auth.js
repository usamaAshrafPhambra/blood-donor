import axios from "axios";
import {
  LOADING,
  SIGNUP_FAIL,
  SIGNUP,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_FAIL,
  SIGNIN,
  GAUTH,
  FAUTH,
  LOGOUT,
  LOGOUT_FAIL,
} from "./type";
import setAuthToken from "../utils/setAuthToken";
import { Redirect } from "react-router-dom";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const signup = (values, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = values;

  try {
    dispatch({
      type: LOADING,
    });
    const res = await axios.post("/api/user", body, config);
    dispatch({
      type: SIGNUP,
      payload: res.data,
    });

    if (res.data) {
      history.push("/login");
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const signin = (values) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = values;

  try {
    dispatch({
      type: LOADING,
    });

    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: SIGNIN,
      payload: res.data,
    });
    if (res.data) {
      dispatch(loadUser());
    }
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

export const gsignin = (payload, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/google", payload);

    const data = res.data;

    dispatch({
      type: SIGNIN,
      payload: data,
    });
    dispatch(loadUser());
    if (res.data) {
      history.push("/login");
    }
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

export const fsignin = (payload, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/facebook", payload);

    const data = res.data;

    dispatch({
      type: SIGNIN,
      payload: data,
    });
    dispatch(loadUser());
    if (res.data) {
      history.push("/login");
    }
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });

    // history.push("/login");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
