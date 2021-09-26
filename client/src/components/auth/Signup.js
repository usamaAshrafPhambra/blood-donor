import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
import { Row, Col } from "antd";
import { Card, Form, Input, Button, Checkbox } from "antd";
import BloodDrop from "../../utils/BloodDrop";
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
              <Card>
                <Form
                  className="form"
                  onSubmit={(e) => {
                    onSubmit(e);
                  }}
                >
                  <Form.Item>
                    <Input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      type="text"
                      placeholder="email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                      value={password}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      type="password"
                      placeholder="Conform password"
                      name="password2"
                      required
                      value={password2}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Input
                      type="submit"
                      value="Sign up"
                      className="forms_buttons-action"
                    />
                  </Form.Item>
                  <p className="my-1">
                    You have already account <Link to="/login">Log In</Link>
                  </p>
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
});

// export default Signup;
export default connect(mapStateToProps, { signup })(withRouter(Signup));
