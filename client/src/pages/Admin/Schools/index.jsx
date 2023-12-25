import React from "react";
import { useNavigate } from "react-router-dom";
import SchoolForm from "./SchoolForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { Button, Table, message } from "antd";
import { GetAllSchools } from "../../../apis/schools";
import { getDateFormat, getDateTimeFormat } from "../../../helpers";

function Schools() {
  const [schools, setSchools] = React.useState([]);
  const dispatch = useDispatch();
  const [showSchoolForm, setShowSchoolForm] = React.useState(false);
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = React.useState(null);

  const fetchSchools = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllSchools();
      setSchools(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "School",
      dataIndex: "profile",
      render: (text, record) => {
        return <img src={record?.profilePic} alt="" className="h-8" />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Initial",
      dataIndex: "initial",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "QS #2024",
      dataIndex: "rankingQS",
    },
    {
      title: "Link",
      dataIndex: "link",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-pencil-fill"
              onClick={() => {
                setSelectedSchool(record);
                setShowSchoolForm(true);
              }}
            ></i>
            <i className="ri-delete-bin-line"></i>
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setSelectedSchool(null);
            setShowSchoolForm(true);
          }}
        >
          Add School
        </Button>
      </div>

      <Table dataSource={schools} columns={columns} className="mt-5" />

      {showSchoolForm && (
        <SchoolForm
          showSchoolForm={showSchoolForm}
          setShowSchoolForm={setShowSchoolForm}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
          reloadData={fetchSchools}
        />
      )}
    </div>
  );
}

export default Schools;
