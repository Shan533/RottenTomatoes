import React, { useEffect, useState } from "react";
import { message, Rate } from "antd";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-600">
        Welcome {user?.name}
      </h1>
    </div>
  );
}

export default Home;
