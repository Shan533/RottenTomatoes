import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  return (
    <nav className="shadow gray">
      <div className="container py-3 pl-10">
        <div className="flex items-center">
          <div className="flex space-x-4 cursor-pointer">
            <a
              className=" hover:text-pink-700 text-primary"
              onClick={() => navigate("/")}
            >
              Home
            </a>
            <a
              className="hover:text-pink-700 text-primary"
              onClick={() => navigate("/schoolspage")}
            >
              Schools
            </a>
            <a
              className="hover:text-pink-700 text-primary"
              onClick={() => navigate("/programspage")}
            >
              Programs
            </a>
            <a
              className="hover:text-pink-700 text-primary"
              onClick={() => navigate("/reviewspage")}
            >
              Reviews
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
