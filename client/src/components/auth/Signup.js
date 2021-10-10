import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
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
const Signup = ({ signup, history, loading }) => {
  const { Paragraph } = Typography;
  const [form] = Form.useForm();
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

  const submitForm = (values) => {
    if (values.password !== values.conformPassword) {
      console.log("password do not match!", "danger");
    } else {
      // console.log("in submit fun");
      signup(values, history);
    }
  };
  // if (isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <div>
      <Row gutter={24}>
        <Col
          className="authPageImage"
          xs={0}
          sm={0}
          md={18}
          lg={18}
          xl={18}
          xxl={18}
        ></Col>
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
                  Sign up
                </Paragraph>
                <Form
                  name="signUpForm"
                  form={form}
                  onFinish={submitForm}
                  autoComplete="off"
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Name" autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" autoComplete="off" />
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
                  <Form.Item
                    name="conformPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your conform password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="conform password"
                      autoComplete="off"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={loading ? true : false}
                      type="primary"
                      htmlType="submit"
                    >
                      Sign up
                    </Button>
                  </Form.Item>
                  <Paragraph>
                    You have already account <Link to="/login">sign In</Link>
                  </Paragraph>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

// export default Signup;
export default connect(mapStateToProps, { signup })(withRouter(Signup));
