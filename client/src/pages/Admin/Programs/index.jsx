import { Button, message, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../../../redux/loadersSlice";
import { DeleteProgram, GetAllPrograms } from "../../../apis/programs";
import { getDateFormat } from "../../../helpers";

function Programs() {
  const [programs, setPrograms] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPrograms = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllPrograms();
      setPrograms(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getPrograms();
  }, []);

  const deleteProgram = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteProgram(id);
      message.success(response.message);
      getPrograms();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "",
      render: (text, record) => {
        const imageUrl = record?.schoolOf.images?.[0] || "";
        return <img src={imageUrl} alt="" className="logo" />;
      },
    },
    {
      title: "Program",
      dataIndex: "name",
    },
    {
      title: "Initial",
      dataIndex: "initial",
    },
    {
      title: "School",
      dataIndex: "schoolOf",
      render: (text, record) => {
        return <div>{record?.schoolOf?.initial}</div>;
      },
    },
    {
      title: "Degree",
      dataIndex: "degree",
    },
    {
      title: "Length",
      dataIndex: "length",
    },
    {
      title: "STEM",
      dataIndex: "isSTEM",
    },
    {
      title: "Total Tuition",
      dataIndex: "totalTuition",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      render: (text) => getDateFormat(text),
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
                navigate(`/admin/programs/edit/${record._id}`);
              }}
            ></i>
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                deleteProgram(record._id);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

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
      <div className="mt-5">
        <Table dataSource={programs} columns={columns} className="mt-5"></Table>
      </div>
    </div>
  );
}

export default Programs;
