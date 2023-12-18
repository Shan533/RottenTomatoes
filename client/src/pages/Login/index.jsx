import React, { useEffect } from "react";
import { Form, Button, message, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apis/users";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      localStorage.setItem("token", response.data);
      message.success(response.message);
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary flex flex-col items-center justify-center">
        <div>
          <h1 className="text-6xl text-green-400 font-semibold tracking-wider">
            ROTTEN POTATOES
          </h1>
          <p className="text-gray-300 mt-2 text-xl tracking-wider text-center">
            A place for picky students all around the world.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-[400px]">
          <h1 className="text-2xl mb-2">Login To Your Account</h1>
          <hr />
          <Form
            layout="vertical"
            className="flex flex-col gap-5 mt-3"
            onFinish={onFinish}
          >
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="flex flex-col gap-5">
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>

              <Link to="/register">Don't have an account? Register here.</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
