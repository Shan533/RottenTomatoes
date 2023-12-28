import React from "react";
import { Form, Tabs, Select, Button, message } from "antd";
import { antValidationError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllSchools } from "../../../apis/schools";
import { useNavigate } from "react-router-dom";
import { degreeTypes } from "./constants";

function ProgramForm() {
  const [schools = [], setSchools] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSchools = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllSchools();
      setSchools(
        response.data.map((school) => ({
          value: school._id,
          label: school.name,
        }))
      );
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  React.useEffect(() => {
    getSchools();
  }, []);

  return (
    <div className="pl-10 pr-10">
      <h1 className="text-gray-600 text-xl font-semibold">Add Program</h1>
      <Tabs>
        <Tabs.TabPane tab="Details" key="1">
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
          >
            <div className="grid grid-cols-3 gap-5">
              <Form.Item label="Name" name="name" rules={antValidationError}>
                <input />
              </Form.Item>
              <Form.Item
                label="Initial"
                name="initial"
                rules={antValidationError}
              >
                <input />
              </Form.Item>
              <Form.Item
                label="School"
                name="school"
                rules={antValidationError}
              >
                <Select options={schools} showSearch />
              </Form.Item>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <Form.Item label="Degree Type" name="degree">
                <Select options={degreeTypes} />
              </Form.Item>
              <Form.Item
                label="Length"
                name="length"
                rules={antValidationError}
              >
                <input type="number" min="0" step="0.5" value="1" />
              </Form.Item>
              <Form.Item
                label="Total Tuition"
                name="totalTuition"
                rules={antValidationError}
              >
                <input type="number" step="1000" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Link"
                name="link"
                rules={antValidationError}
                className="col-span-2"
              >
                <input />
              </Form.Item>
              <Form.Item label="Ranking by Students" name="rankingByStudents">
                <input type="number" />
              </Form.Item>
            </div>
            <Form.Item
              label="Description"
              name="description"
              rules={antValidationError}
            >
              <textarea />
            </Form.Item>
            <Form.Item
              label="Application Requirements"
              name="applicationRequirements"
              rules={antValidationError}
            >
              <textarea />
            </Form.Item>
            <div className="flex justify-end gap-5">
              <Button
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Reviews" key="2"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default ProgramForm;
