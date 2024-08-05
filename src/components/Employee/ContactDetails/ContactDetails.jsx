import { useEffect, useState } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import Dashboard from "../../Dashboard/Dashboard";
import { useAuth } from "../../../context/AuthContext";
import {
  getContactDetails,
  createContactDetails,
  updateContactDetails,
} from "../../../api/ApiService";

const { Option } = Select;

const ContactDetails = () => {
  const { employeeId } = useAuth();
  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await getContactDetails(employeeId);
        if (response.data) {
          setContactDetails(response.data);
          form.setFieldsValue(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [form]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode && contactDetails) {
      form.setFieldsValue(contactDetails);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (contactDetails) {
        await updateContactDetails({ employeeId, contactDetails: values });
        notification.success({
          message: "Contact details updated successfully!",
        });
      } else {
        await createContactDetails({ employeeId, contactDetails: values });
        notification.success({
          message: "Contact details created successfully!",
        });
      }
      setContactDetails(values);
      setEditMode(false);
    } catch (error) {
      notification.error({ message: "Failed to save contact details" });
    }
  };

  if (loading)
    return (
      <Dashboard>
        <div>Loading...</div>
      </Dashboard>
    );

  return (
    <Dashboard>
      <h3 className="text-xl font-bold mb-2">Contact Details</h3>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="flex justify-end">
          {editMode ? (
            <>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button
                  type="default"
                  onClick={toggleEditMode}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </Form.Item>
            </>
          ) : (
            <Button type="primary" onClick={toggleEditMode}>
              {contactDetails ? "Edit" : "Add"}
            </Button>
          )}
        </div>
        <label>Local Address:</label>
        <Form.Item label="Street" name={["localAddress", "street"]}>
          <Input placeholder="Street" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="City" name={["localAddress", "city"]}>
          <Input placeholder="City" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="State" name={["localAddress", "state"]}>
          <Input placeholder="State" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="Postal Code" name={["localAddress", "postalCode"]}>
          <Input placeholder="Postal Code" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="Country" name={["localAddress", "country"]}>
          <Input placeholder="Country" disabled={!editMode} />
        </Form.Item>

        <label>Permanent Address:</label>
        <Form.Item label="Street" name={["permanentAddress", "street"]}>
          <Input placeholder="Street" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="City" name={["permanentAddress", "city"]}>
          <Input placeholder="City" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="State" name={["permanentAddress", "state"]}>
          <Input placeholder="State" disabled={!editMode} />
        </Form.Item>
        <Form.Item
          label="Postal Code"
          name={["permanentAddress", "postalCode"]}
        >
          <Input placeholder="Postal Code" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="Country" name={["permanentAddress", "country"]}>
          <Input placeholder="Country" disabled={!editMode} />
        </Form.Item>

        <Form.Item label="Mobile No" name="mobileNo">
          <Input placeholder="Mobile" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Email" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="Marital Status" name="maritalStatus">
          <Select placeholder="Select Marital Status" disabled={!editMode}>
            <Option value="Unmarried">Unmarried</Option>
            <Option value="Married">Married</Option>
            <Option value="Divorcee">Divorcee</Option>
            <Option value="Widow">Widow</Option>
            <Option value="Widower">Widower</Option>
            <Option value="NA">NA</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Spouse Name" name="spouseName">
          <Input placeholder="Spouse Name" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="Alternate Email" name="alternateEmail">
          <Input placeholder="Alternate Email" disabled={!editMode} />
        </Form.Item>
        <Form.Item label="UAN Number" name="uanNumber">
          <Input placeholder="UAN Number" disabled={!editMode} />
        </Form.Item>
      </Form>
    </Dashboard>
  );
};

export default ContactDetails;
