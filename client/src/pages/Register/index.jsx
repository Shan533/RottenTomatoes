import React, { useEffect } from "react";
import { Form, Button, message, Input } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import { antValidationError } from "../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await RegisterUser(values);
      dispatch(SetLoading(false));
      message.success(response.message);
      navigate("/login");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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
          <h1 className="text-2xl mb-2">Register Your Account</h1>
          <hr />
          <Form
            layout="vertical"
            className="flex flex-col gap-5 mt-3"
            onFinish={onFinish}
          >
            <Form.Item label="Username" name="name" rules={antValidationError}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={antValidationError}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={antValidationError}
            >
              <Input.Password />
            </Form.Item>

            <div className="flex flex-col gap-5">
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>

              <Link to="/login">Already have an account? Login here.</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
