import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signin, gsignin } from "../../actions/auth";
import { useDispatch } from "react-redux";
import GoogleSignIn from "./GoogleSignIn";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Button,
  Checkbox,
} from "antd";
import BloodDrop from "../../utils/BloodDrop";
import FaceBookSignIn from "./FaceBookSignIn";

// import classes from "*.module.css";

const Login = ({ signin, loading, isAuthenticated }) => {
  const { Paragraph } = Typography;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (values) => {
    signin(values);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <Row justify="center">
            <Col
              span={20}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <BloodDrop />
            </Col>
            <Col span={20}>
              <Card
                style={{
                  zIndex: 2,
                  boxShadow: "5px 5px 5px 5px rgba(208, 216, 243, 0.6)",
                }}
              >
                <Paragraph
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Sign in
                </Paragraph>
                <Form
                  name="signInForm"
                  onFinish={submitForm}
                  autoComplete="off"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="email" autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" autoComplete="off" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={loading ? true : false}
                      type="primary"
                      htmlType="submit"
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                  <Paragraph
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontWeight: "bolder",
                    }}
                  >
                    or
                  </Paragraph>

                  <Row>
                    <Col span={12}>
                      <Paragraph>Sign in with</Paragraph>
                    </Col>
                    <Col span={12}>
                      <GoogleSignIn />
                    </Col>
                  </Row>
                  <Typography>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </Typography>
                </Form>
              </Card>
            </Col>
          </Row>

          {/* <FaceBookSignIn /> */}
        </Col>
        <Col
          className="authPageImage"
          xs={0}
          sm={0}
          md={18}
          lg={18}
          xl={18}
          xxl={18}
        ></Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { signin, gsignin })(Login);
// export  default Login;
