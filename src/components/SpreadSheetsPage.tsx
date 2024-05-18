import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { antdModalStyles } from "../utils/styleForModal";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const SpreadSheetsPage = ({ darkMode }: any) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const fields = [
    {
      name: "Table Name",
      id: "table_name",
      value: "",
      type: "text",
      placeholder: "Enter Table Name",
    },
    {
      name: "Description",
      id: "description",
      value: "",
      type: "text",
      placeholder: "Enter Description",
    },
  ];
  const [dynamicFields, setDynamicFields] = useState<any>([]);

  const FieldTypes = [
    "Text",
    "Number",
    "Email",
    "Password",
    "Date",
    "Time",
    "datetime-local",
  ];
console.log("demo changes")

  const [dynamicFieldCount, setDynamicFieldCount] = useState(0);

  const handleAddField = () => {
    const newFieldId = `dynamic_field_${dynamicFieldCount + 1}`;
    const newField = {
      id: newFieldId,
      value: "",
      type: "text",
      placeholder: "Enter Value",
    };
    setDynamicFields([...dynamicFields, newField]);
    setDynamicFieldCount(dynamicFieldCount + 1);
  };

  const handleDeleteField = (id: string) => {
    const updatedFields = dynamicFields?.filter(
      (field: any) => field.id !== id
    );
    setDynamicFields(updatedFields);
    setDynamicFieldCount(dynamicFieldCount - 1);
  };

  const onFinish = (formData: any) => {
    console.log("Form data:", formData);
  };

  const handleChangeFieldType = (index: number, value: string) => {
    if (dynamicFields && dynamicFields.length > index) {
      const newFields = [...dynamicFields];
      if (newFields[index]) {
        newFields[index].type = value;
        setDynamicFields(newFields);
        const fieldName = `dynamic_field_${index + 1}_type`;
        form.setFieldsValue({ [fieldName]: value });
      }
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        + Add
      </Button>
      <Modal
        title="Add Spreadsheet"
        visible={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={() => form.submit()}
          >
            Save
          </Button>,
        ]}
        styles={darkMode ? antdModalStyles : {}}
        // Set modal style based on dark mode
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{
            color: darkMode ? "white" : "#000",
          }}
        >
          {[...fields, ...dynamicFields].map((field: any, index: any) => (
            <div key={index} style={{ display: "flex" }}>
              <Form.Item
                label={
                  field?.name ? field?.name : index >= 3 ? "" : "Add Fields"
                }
                name={field?.id ? field.id : ""}
                rules={[
                  { required: true, message: `${field.name} is required` },
                ]}
                style={{
                  marginRight: "10px",
                  flex: 1,
                }}
              >
                <Input
                  style={{
                    marginRight: "10px",
                    flex: 1,
                  }}
                  placeholder={field.placeholder}
                />
              </Form.Item>
              {index >= 2 && (
                <Form.Item
                  label={index >= 3 ? "" : " "}
                  initialValue={field.type}
                  name={`dynamic_field_${index + 1}_type`}
                >
                  <Select
                    style={{ width: 120, marginRight: 10 }}
                    defaultValue={FieldTypes[0].toLowerCase()}
                    onChange={(value) => handleChangeFieldType(index, value)}
                  >
                    {FieldTypes.map((type) => (
                      <Select.Option
                        key={type?.toLowerCase()}
                        value={type?.toLowerCase()}
                      >
                        {type === "datetime-local" ? "Date & Time" : type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              {index > 1 && (
                <Button
                  danger
                  size="small"
                  style={{ marginTop: index >= 3 ? 0 : 30 }}
                  shape="circle"
                  onClick={() => handleDeleteField(field.id)}
                >
                  -
                </Button>
              )}
            </div>
          ))}
          <Button type="primary" onClick={handleAddField}>
            + Add
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default SpreadSheetsPage;
