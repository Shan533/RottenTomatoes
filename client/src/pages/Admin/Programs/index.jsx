import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Programs() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            navigate("/admin/programs/add");
          }}
        >
          Add Program
        </Button>
      </div>
    </div>
  );
}

export default Programs;
