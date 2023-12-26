import React from "react";
import { Button, Form, Input, Modal, Tabs, Upload, message } from "antd";
import { antValidationError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { AddSchool, UpdateSchool } from "../../../apis/schools";
import { UploadImage } from "../../../apis/images";
import { SetLoading } from "../../../redux/loadersSlice";

function SchoolForm({
  showSchoolForm,
  setShowSchoolForm,
  selectedSchool,
  reloadData,
  setSelectedSchool,
}) {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = React.useState("1");
  const [file, setFile] = React.useState(null);
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

  const imageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(SetLoading(true));
      const response = await UploadImage(formData);
      if (response.success) {
        await UpdateSchool(selectedSchool._id, {
          ...selectedSchool,
          images: [...(selectedSchool?.images || []), response.data],
        });
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

  const deleteImage = async (image) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpdateSchool(selectedSchool._id, {
        ...selectedSchool,
        images: selectedSchool?.images?.filter((item) => item !== image),
      });
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
      title=""
      centered
      width={800}
      okText={selectedSchool ? "Update" : "Add"}
      onOk={() => {
        if (selectedTab === "1") {
          form.submit();
        } else {
          imageUpload();
        }
      }}
    >
      <>
        <div className="h1 text-center font-semibold text-gray-600 text-2xl uppercase">
          {selectedSchool ? "Update" : "Add"} School
        </div>

        <Tabs defaultActiveKey="1" onChange={(key) => setSelectedTab(key)}>
          <Tabs.TabPane tab="Basic Info" key="1">
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
                <Form.Item
                  label="Initial"
                  name="initial"
                  rules={antValidationError}
                >
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
                <Form.Item
                  label="Country"
                  name="country"
                  rules={antValidationError}
                >
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
          </Tabs.TabPane>

          <Tabs.TabPane tab="Images" key="2" disabled={!selectedSchool}>
            <div className="flex flex-wrap gap-5 mb-10">
              {selectedSchool?.images?.map((image) => (
                <div
                  key={image}
                  className="flex gap-5 border border-dashed p-3"
                >
                  <img src={image} alt="" className="w-20 h-20 object-cover" />
                  <i
                    className="ri-delete-bin-line"
                    onClick={() => {
                      deleteImage(image);
                    }}
                  ></i>
                </div>
              ))}
            </div>

            <Upload
              onChange={(info) => {
                setFile(info.file);
              }}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Tabs.TabPane>
        </Tabs>
      </>
    </Modal>
  );
}

export default SchoolForm;
