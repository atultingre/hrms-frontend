// src/components/ContactDetailsForm.js
import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  createContactDetails,
  updateContactDetails,
  getContactDetails,
} from "../api";

const ContactDetailsForm = () => {
  const [form] = Form.useForm();
  const [contactDetails, setContactDetails] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await getContactDetails();
        setContactDetails(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };

    fetchContactDetails();
  }, [form]);

  const onFinish = async (values) => {
    try {
      if (contactDetails) {
        await updateContactDetails(values);
        notification.success({
          message: "Contact details updated successfully!",
        });
      } else {
        await createContactDetails(values);
        notification.success({
          message: "Contact details created successfully!",
        });
      }
    } catch (error) {
      notification.error({ message: "Failed to save contact details" });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="street" label="Street">
        <Input />
      </Form.Item>
      <Form.Item name="city" label="City">
        <Input />
      </Form.Item>
      <Form.Item name="state" label="State">
        <Input />
      </Form.Item>
      <Form.Item name="postalCode" label="Postal Code">
        <Input />
      </Form.Item>
      <Form.Item name="country" label="Country">
        <Input />
      </Form.Item>
      <Form.Item name="mobileNo" label="Mobile No">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="maritalStatus" label="Marital Status">
        <Input />
      </Form.Item>
      <Form.Item name="spouseName" label="Spouse Name">
        <Input />
      </Form.Item>
      <Form.Item name="alternateEmail" label="Alternate Email">
        <Input />
      </Form.Item>
      <Form.Item name="uanNumber" label="UAN Number">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {contactDetails ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactDetailsForm;
