import React from "react";
import { GoogleLogin } from "react-google-login";
import { gsignin } from "../../actions/auth";
import { connect } from "react-redux";

const GoogleSignIn = ({ gsignin, isAuthenticated }) => {
  const responseGoogle = async (response) => {
    if (response.error) {
      console.log({ message: response.detail });
      return;
    } else {
      gsignin({ token: response.tokenId });
    }
  };

  return (
    <div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { gsignin })(GoogleSignIn);
