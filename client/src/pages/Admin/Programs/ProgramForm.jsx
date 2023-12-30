import React, { useEffect } from "react";
import { Form, Tabs, Select, Button, message } from "antd";
import { antValidationError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllSchools } from "../../../apis/schools";
import { useNavigate, useParams } from "react-router-dom";
import {
  booleanOptions,
  currencyOptions,
  degreeTypes,
  requiredOptions,
} from "./constants";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import {
  AddProgram,
  GetProgramById,
  UpdateProgram,
} from "../../../apis/programs";

function ProgramForm() {
  const [schools = [], setSchools] = React.useState([]);
  const [program, setProgram] = React.useState();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState("1");
  const navigate = useNavigate();
  const params = useParams();

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

  const getProgram = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await GetProgramById(id);
      response.data.deadline = moment(response.data.deadline).format(
        "YYYY-MM-DD"
      );
      response.data.schoolOf = response.data?.schoolOf._id;

      setProgram(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response;
      if (params?.id) {
        response = await UpdateProgram(params.id, values);
      } else {
        response = await AddProgram(values);
      }
      message.success(response.message);
      dispatch(SetLoading(false));
      navigate("/admin");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getSchools();
  }, []);

  useEffect(() => {
    if (params?.id) {
      getProgram(params.id);
    }
  }, []);

  return (
    (program || !params.id) && (
      <div className="pl-10 pr-10">
        <h1 className="text-gray-600 text-xl font-semibold">
          {params?.id ? "Edit Program" : "Add Program"}
        </h1>

        <Form
          layout="vertical"
          className="flex flex-col gap-5 pt-5"
          onFinish={onFinish}
          initialValues={program}
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
              name="schoolOf"
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
            <Form.Item label="Length" name="length" rules={antValidationError}>
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
                <input type="number" />
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

          <h1 className="text-gray-600 text-lg font-semibold">Requirements</h1>
          <div id="req1" className="grid grid-cols-4 gap-5">
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
              <Select options={requiredOptions} />
            </Form.Item>
          </div>

          <div id="req2" className="grid grid-cols-4 gap-5">
            <Form.Item label="Portfolio" name="portfolio">
              <Select options={requiredOptions} />
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

          <div id="Buttons" className="flex justify-end gap-5">
            <Button
              onClick={() => {
                navigate("/admin");
              }}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              {params?.id ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default ProgramForm;
