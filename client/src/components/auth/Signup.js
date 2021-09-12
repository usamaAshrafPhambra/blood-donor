import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";

import { Card } from "antd";

const Signup = ({ signup, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log("password do not match!", "danger");
    } else {
      signup({ name, email, password }, history);
    }
  };
  // if (isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }
  return (
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
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
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
          <div className="forms_field">
            <input
              type="password"
              placeholder="Conform password"
              name="password2"
              required
              value={password2}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>

          <div className="forms_buttons">
            <input
              type="submit"
              value="Sign up"
              className="forms_buttons-action"
            />
          </div>
          <p className="my-1">
            You have already account <Link to="/login">Log In</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// export default Signup;
export default connect(mapStateToProps, { signup })(withRouter(Signup));
