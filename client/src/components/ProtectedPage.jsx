import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apis/users";

function ProtectedPage({ children }) {
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);

  return (
    <div>
        {user && <h1>Welcome {user.name} </h1>}
        {children}
    </div>
  );
}

export default ProtectedPage;