import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apis/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice";

function ProtectedPage({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      dispatch(SetUser(response.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token has expired or is invalid
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpires");
        navigate("/login");
      } else {
        message.error(error.message);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpires = localStorage.getItem("tokenExpires");

    if (!token || !tokenExpires || Date.now() > parseInt(tokenExpires)) {
      // Token doesn't exist or has expired
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpires");
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center bg-primary p-5 pl-10 pr-10">
        <span
          className="font-semibold text-green-400 tracking-wider text-2xl cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          ROTTEN POTATOES
        </span>

        <div className="bg-white rounded px-5 py-2 flex gap-2">
          <i className="ri-shield-user-line"></i>
          <span
            className="text-primary text-sm cursor-pointer underline"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {user?.name}
          </span>
          <i
            className="ri-logout-box-r-line ml-8"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          ></i>
        </div>
      </div>

      {user && <div className="p-5">{children}</div>}
    </div>
  );
}

export default ProtectedPage;
