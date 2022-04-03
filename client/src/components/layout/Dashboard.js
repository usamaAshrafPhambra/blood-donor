import React from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { logout } from "../../actions/auth";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const Dashboard = ({ auth, history, logout }) => {
  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <div>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              profile
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
              logout
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Dashboard));
