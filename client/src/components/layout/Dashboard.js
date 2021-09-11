import React from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";

const Dashboard = ({ auth, history }) => {
  return (
    <div>
      <h1>dashnoard coming soon...</h1>
    </div>
  );
};

export default connect(null, null)(withRouter(Dashboard));
