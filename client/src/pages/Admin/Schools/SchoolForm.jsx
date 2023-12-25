import React from "react";
import { Form, Modal, Input } from "antd";
import {antValidationError} from "../../../helpers"

function SchoolForm({ showSchoolForm, setShowSchoolForm }) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Modal
      open={showSchoolForm}
      onCancel={() => setShowSchoolForm(false)}
      title="Add School"
      centered
      width={800}
      okText="Add"
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-5"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Name" name="name"
        rules={antValidationError}>
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
          <Form.Item label="Location" name="location" rules={antValidationError}>
            <Input type="text" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item label="Year Founded" name="year" rules={antValidationError}>
            <Input type="month" />
          </Form.Item>
          <Form.Item label="Ranking QS" name="rankingQS" rules={antValidationError}>
            <Input type="number" />
          </Form.Item>
        </div>

        <Form.Item label="Link" name="link" rules={antValidationError}>
          <Input type="url" />
        </Form.Item>

        <Form.Item label="Profile Pic" name="profilePic" rules={antValidationError}>
          <Input type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SchoolForm;
