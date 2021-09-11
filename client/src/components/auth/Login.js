import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signin, gsignin } from "../../actions/auth";
import { useDispatch } from "react-redux";

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

  const responseGoogle = async (response) => {
    if (response.error) {
      console.log({ message: response.detail });
      return;
    } else {
      gsignin({ token: response.tokenId });
    }
  };

  return (
    <>
      <div>
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
          <GoogleLogin
            clientId="682785319429-1de8p9vjsishbb58q9qudk634jbd6q3m.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            redirectUri="http://localhost:3000/dashboard"
            // scope={`${process.env.GOOGLE_SCOPE}`}
            render={(renderProps) => (
              <button
                fullWidth
                className="googlebutton"
                // disabled={loading}
                onClick={renderProps.onClick}
                size="large"
                variant="contained"
              >
                <span style={{ padding: "7px" }}>Sign in with Google</span>
              </button>
            )}
          />
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signin, gsignin })(Login);
// export  default Login;
