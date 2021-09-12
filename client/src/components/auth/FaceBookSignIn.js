import React from "react";
import FacebookLogin from "react-facebook-login";
import { fsignin } from "../../actions/auth";
import { connect } from "react-redux";

const FaceBookSignIn = ({ fsignin, isAuthenticated }) => {
  const responseFacebook = async (response) => {
    if (response.error) {
      console.log({ message: response.detail });
      return;
    } else {
      console.log("response", response.accessToken);
      fsignin({ token: response.accessToken });
    }
  };

  const componentClicked = () => {
    console.log("clicked");
  };

  return (
    <div>
      <FacebookLogin
        appId="233560808720195"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { fsignin })(FaceBookSignIn);
