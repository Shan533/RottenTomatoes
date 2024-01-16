import { Button, message, Switch, Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat, getDateTimeFormat } from "../../../helpers";
import { GetAllUsers, UpdateUser } from "../../../apis/users";

function Users() {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllUsers();
      setUsers(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const updateUser = async (user) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpdateUser(user);
      message.success(response.message);
      getUsers();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      render: (text, user) => (
        <Switch
          checked={text}
          onChange={(checked) => updateUser({ ...user, isAdmin: checked })}
        />
      ),
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      render: (text, user) => (
        <Switch
          checked={text}
          onChange={(checked) => updateUser({ ...user, isActive: checked })}
        />
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateTimeFormat(text),
    },
  ];

  return (
    <div>
      <div className="mt-5">
        <Table dataSource={users} columns={columns} className="mt-5"></Table>
      </div>
    </div>
  );
}

export default Users;
