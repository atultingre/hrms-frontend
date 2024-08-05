import { useEffect, useState } from "react";
import { Form, Input, Button, notification, Select } from "antd";
import { getEmployeeById, RegisterEmployee } from "../../api/ApiService";
import { useParams, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const { data } = await getEmployeeById(id);
          form.setFieldsValue(data);
        } catch (error) {
          notification.error({ message: "Failed to fetch employee details" });
        }
      };
      fetchEmployee();
    }
  }, [id, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await RegisterEmployee(values);
      notification.success({ message: "Employee created successfully" });
      navigate("/login");
    } catch (error) {
      notification.error({ message: "Failed to save employee" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="../logo.png"
          className="mx-auto bg-black h-12 px-4 rounded-lg w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Flexisales HRMS Register
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-6xl">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-0 "
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please input the Full Name" },
              ]}
            >
              <Input
                placeholder="Full Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="employeeId"
              label="Employee ID"
              rules={[
                { required: true, message: "Please input the Employee ID!" },
              ]}
            >
              <Input
                placeholder="Employee ID"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the Password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              className=""
              rules={[{ required: true, message: "Please select the Gender!" }]}
            >
              <Select
                placeholder="Select Gender"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="fathersName"
              label="Fathers Name"
              rules={[
                { required: true, message: "Please input the Fathers Name!" },
              ]}
            >
              <Input
                placeholder="Fathers Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please input the Date of Birth!" },
              ]}
            >
              <Input
                type="date"
                placeholder="Date of Birth"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="confirmationDate"
              label="Confirmation Date"
              rules={[
                {
                  required: true,
                  message: "Please input the Confirmation Date!",
                },
              ]}
            >
              <Input
                type="date"
                placeholder="Confirmation Date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="joiningDate"
              label="Joining Date"
              rules={[
                { required: true, message: "Please input the Joining Date!" },
              ]}
            >
              <Input
                type="date"
                placeholder="Joining Date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="department"
              label="Department"
              rules={[
                { required: true, message: "Please input the Department!" },
              ]}
            >
              <Input
                placeholder="Department"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item
              name="designation"
              label="Designation"
              rules={[
                { required: true, message: "Please input the Designation!" },
              ]}
            >
              <Input
                placeholder="Designation"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item name="division" label="Division">
              <Input
                placeholder="Division"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item name="mainDivision" label="Main Division">
              <Input
                placeholder="Main Division"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item name="subDivision" label="Sub Division">
              <Input
                placeholder="Sub Division"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item name="bankAccountNumber" label="Bank Account Number">
              <Input
                placeholder="Bank Account Number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item name="aadharNumber" label="Aadhar Number">
              <Input
                placeholder="Aadhar Number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
            <Form.Item name="uanNumber" label="UAN Number">
              <Input
                placeholder="UAN Number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
