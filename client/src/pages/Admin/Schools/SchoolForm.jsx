import React from "react";
import { Button, Form, Input, Modal, Tabs, Upload, message } from "antd";
import { antValidationError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { AddSchool, UpdateSchool } from "../../../apis/schools";
import { SetLoading } from "../../../redux/loadersSlice";

function SchoolForm({
  showSchoolForm,
  setShowSchoolForm,
  selectedSchool,
  reloadData,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response;
      if (selectedSchool) {
        response = await UpdateSchool(selectedSchool._id, values);
      } else {
        response = await AddSchool(values);
      }
      reloadData();
      dispatch(SetLoading(false));
      message.success(response.message);
      setShowSchoolForm(false);
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  return (
    <Modal
      open={showSchoolForm}
      onCancel={() => setShowSchoolForm(false)}
      title={selectedSchool ? "Edit School" : "Add School"}
      centered
      width={800}
      okText={selectedSchool ? "Update" : "Add"}
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-5"
        onFinish={onFinish}
        form={form}
        initialValues={selectedSchool}
      >
        <Form.Item label="Name" name="name" rules={antValidationError}>
          <Input />
        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item label="Initial" name="initial" rules={antValidationError}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={antValidationError}>
            <select>
              <option value="">Select</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Research">Research</option>
              <option value="Liberal Arts">Liberal Arts</option>
              <option value="Community">Community</option>
              <option value="Other">Other</option>
            </select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item label="Country" name="country" rules={antValidationError}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={antValidationError}
          >
            <Input type="text" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Year Founded"
            name="year"
            rules={antValidationError}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Ranking QS"
            name="rankingQS"
            rules={antValidationError}
          >
            <Input type="number" />
          </Form.Item>
        </div>

        <Form.Item label="Link" name="link" rules={antValidationError}>
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Profile Pic"
          name="profilePic"
          rules={antValidationError}
        >
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SchoolForm;
