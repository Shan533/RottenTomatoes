import React from "react";
import { useNavigate } from "react-router-dom";
import SchoolForm from "./SchoolForm";

function Schools() {
  const [showSchoolForm, setShowSchoolForm] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end">
        <button onClick={() => setShowSchoolForm(true)}> Add School </button>
      </div>
      {showSchoolForm && (
        <SchoolForm
          showSchoolForm={showSchoolForm}
          setShowSchoolForm={setShowSchoolForm}
        />
      )}
    </div>
  );
}

export default Schools;
