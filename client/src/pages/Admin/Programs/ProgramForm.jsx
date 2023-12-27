import React from "react";
import { Form, Tabs, Select, Button } from "antd";
import { antValidationError } from "../../../helpers";

function ProgramForm() {
  const tempOptions = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
  ];
  return (
    <div>
      <h1 className="text-gray-600 text-xl font-semibold">Add Program</h1>
      <Tabs>
        <Tabs.TabPane tab="Details" key="1">
          <Form layout="vertical" className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Name"
                name="name"
                rules={antValidationError}
                className="col-span-2"
              >
                <input />
              </Form.Item>
              <Form.Item
                label="Initial"
                name="initial"
                rules={antValidationError}
              >
                <input />
              </Form.Item>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="School"
                name="school"
                rules={antValidationError}
              >
                <Select options={tempOptions} />
              </Form.Item>
              <Form.Item
                label="Link"
                name="link"
                rules={antValidationError}
                className="col-span-2"
              >
                <input />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
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
              <Button>Cancel</Button>
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
