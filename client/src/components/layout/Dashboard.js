import React from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { logout } from "../../actions/auth";

const Dashboard = ({ auth, history, logout }) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <h1>dashnoard coming soon...</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Dashboard));
