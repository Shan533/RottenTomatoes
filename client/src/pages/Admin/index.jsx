import React from "react";
import { Tabs } from "antd";
import Programs from "./Programs";
import Schools from "./Schools";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [activeTab, setActiveTab] = React.useState("1");
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  return (
    <div>
      {user?.isAdmin ? (
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            navigate(`/admin?tab=/${key}`);
          }}
        >
          <Tabs.TabPane tab="Programs" key="1">
            <Programs />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Schools" key="2">
            <Schools />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="3">
            <Users />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <div className="text-gray-600 text-md text-center mt-20">
          You are not authorized to view this page.
        </div>
      )}
    </div>
  );
}

export default Admin;
