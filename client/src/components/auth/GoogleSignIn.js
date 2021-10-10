import React from "react";
import { GoogleLogin } from "react-google-login";
import { gsignin } from "../../actions/auth";
import { connect } from "react-redux";
import { Button } from "antd";
import { GooglePlusCircleFilled } from "@ant-design/icons";

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
          <GooglePlusCircleFilled
            onClick={renderProps.onClick}
            style={{ color: "#90caf9", fontSize: 25 }}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { gsignin })(GoogleSignIn);
