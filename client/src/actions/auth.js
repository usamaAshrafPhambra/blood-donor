import axios from "axios";
import {
  SIGNUP_FAIL,
  SIGNUP,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_FAIL,
  SIGNIN,
  GAUTH,
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

export const signup =
  ({ name, email, password }, history) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/user", body, config);

      dispatch({
        type: SIGNUP,
        payload: res.data,
      });
      // dispatch(loadUser());
      if (res.data) {
        history.push("/login");
      }
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

export const signin =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch({
        type: SIGNIN,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: SIGNIN_FAIL,
      });
    }
  };

export const gsignin = (payload, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/google", payload);
    const data = res.data;
    console.log("action res", data);

    dispatch({
      type: SIGNIN,
      payload: data,
    });
    dispatch(loadUser());
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};
