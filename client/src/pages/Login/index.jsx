import React, { useEffect } from "react";
import { Form, Button, message, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apis/users";
import { antValidationError } from "../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { GoogleLogin } from "@react-oauth/google";
import { LoginGmail } from "../../apis/oauth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await LoginUser(values);

      // Store the token and expiration time in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "tokenExpires",
        Date.now() + response.data.expiresIn * 1000
      );

      dispatch(SetLoading(false));
      message.success(response.message);
      navigate("/");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      dispatch(SetLoading(true));
      const token = credentialResponse.credential; // The Google ID token
      if (!token) {
        return message.error("Google login failed: Missing token");
      }

      const response = await LoginGmail({ token });
      localStorage.setItem("token", response.data.token);

      dispatch(SetLoading(false));
      message.success(response.message);
      navigate("/");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const handleGoogleError = () => {
    message.error("Google login failed");
  };

  useEffect(() => {
    // Check if token exists and has not expired
    const token = localStorage.getItem("token");
    const tokenExpires = localStorage.getItem("tokenExpires");

    if (token && tokenExpires && Date.now() < parseInt(tokenExpires)) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="bg-primary flex flex-col items-center justify-center lg:pt-0 pt-16">
        <div>
          <h1 className="lg:text-6xl lg:text-left text-center text-green-400 font-semibold tracking-wider text-3xl">
            ROTTEN POTATOES
          </h1>
          <p className="text-gray-300 mt-2 lg:text-xl text-lg tracking-wider text-center">
            A place for picky students all around the world.
          </p>
        </div>
      </div>

      <div className="flex lg:items-center lg:pt-0 pt-16 justify-center">
        <div className="lg:w-[400px]">
          <h1 className="text-2xl mb-2">Login To Your Account</h1>
          <hr />
          <Form
            layout="vertical"
            className="flex flex-col gap-5 mt-3"
            onFinish={onFinish}
          >
            <Form.Item label="Email" name="email" rules={antValidationError}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={antValidationError}
            >
              <Input type="password" />
            </Form.Item>

            <div className="flex flex-col gap-5">
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

              <Link to="/register">Don't have an account? Register here.</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
