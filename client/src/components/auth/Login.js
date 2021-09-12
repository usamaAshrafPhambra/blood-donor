import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signin, gsignin } from "../../actions/auth";
import { useDispatch } from "react-redux";
import GoogleSignIn from "./GoogleSignIn";
import FaceBookSignIn from "./FaceBookSignIn";

import { Card } from "antd";
// import classes from "*.module.css";

const Login = ({ signin, gsignin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    signin({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: 300 }}>
          <form
            className="form"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className="forms_field">
              <input
                type="text"
                placeholder="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="forms_field">
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>

            <div className="forms_buttons">
              <input
                type="submit"
                value="Log In"
                className="forms_buttons-action"
              />
            </div>
            <p className="my-1">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
          <GoogleSignIn />
          {/* <FaceBookSignIn /> */}
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signin, gsignin })(Login);
// export  default Login;
