import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToastify from "../hooks/useToastify";
import { login } from "../redux/authSlice";
import { Content } from "antd/es/layout/layout";
import authService from "../services/authSearvices";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toastMessage } = useToastify();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await authService.login(values);
      if (res?.status === 200 && res?.accessToken) {
        dispatch(login(res)); // Dispatch the login action with user info
        toastMessage("success", "Login successfully");
        navigate("/"); // Navigate to home page
      } else {
        toastMessage(
          "error",
          "Verify your user email and password and try again."
        );
      }
    } catch (error) {
      toastMessage("error", "An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          background: "#8492A6",
          borderRadius: 10,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          padding: 40,
        }}
      >
        <div className="text-center">
          <h1 className="fs-1 mb-10 fw-bolder" style={{ color: "#fff" }}>
            Sign In{" "}
          </h1>
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ width: "100%" }}
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-lg w-100 mb-5"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default Login;
