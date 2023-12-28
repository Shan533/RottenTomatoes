import React from "react";
import { Form, Tabs, Select, Button, message } from "antd";
import { antValidationError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllSchools } from "../../../apis/schools";
import { useNavigate } from "react-router-dom";
import { booleanOptions, currencyOptions, degreeTypes } from "./constants";
import TextArea from "antd/es/input/TextArea";

function ProgramForm() {
  const [schools = [], setSchools] = React.useState([]);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = React.useState("1");
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
              <Form.Item
                label="Degree Type"
                name="degree"
                rules={antValidationError}
              >
                <Select options={degreeTypes} />
              </Form.Item>
              <Form.Item
                label="Length"
                name="length"
                rules={antValidationError}
              >
                <input type="number" min="0" step="0.5" value="1" />
              </Form.Item>
              <Form.Item label="STEM" name="isSTEM" rules={antValidationError}>
                <Select options={booleanOptions} />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="grid grid-cols-3 gap-5">
                <Form.Item
                  label="Currency"
                  name="currency"
                  rules={antValidationError}
                >
                  <Select options={currencyOptions} />
                </Form.Item>
                <Form.Item
                  label="Total Tuition"
                  name="totalTuition"
                  rules={antValidationError}
                  className="col-span-2"
                >
                  <input type="number" step="1000" />
                </Form.Item>
              </div>
              <Form.Item
                label="Link"
                name="link"
                rules={antValidationError}
                className="col-span-2"
              >
                <input />
              </Form.Item>
            </div>
            <Form.Item label="Description" name="description">
              <TextArea />
            </Form.Item>

            <div className="flex justify-end gap-5">
              <Button
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Cancel
              </Button>
              <Button>Save and Continue</Button>
              <Button htmlType="submit" type="primary">
                Add
              </Button>
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Requirements" key="2">
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
          >
            <div className="grid grid-cols-4 gap-5">
              <Form.Item label="TOEFL" name="toefl">
                <input />
              </Form.Item>
              <Form.Item label="IELTS" name="ielts">
                <input />
              </Form.Item>
              <Form.Item label="Other Tests" name="otherTests">
                <input />
              </Form.Item>
              <Form.Item label="GRE" name="gre">
                <input />
              </Form.Item>
            </div>

            <div className="grid grid-cols-4 gap-5">
              <Form.Item label="Portfolio" name="portfolio">
                <input />
              </Form.Item>
              <Form.Item label="GPA" name="gpa">
                <input />
              </Form.Item>
              <Form.Item label="Class Size" name="classSize">
                <input />
              </Form.Item>
              <Form.Item label="Deadline" name="deadline">
                <input type="date" />
              </Form.Item>
            </div>

            <Form.Item label="Other Requirements" name="otherRequirements">
              <textarea />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Reviews" key="3"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default ProgramForm;
