import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { loginEmployee } from "../../api/ApiService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    setToken,
    setEmployeeId,
    setFullName,
    setIsAdmin,
    loginUserId,
    setLoginUserId,
  } = useAuth();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmployeeId = localStorage.getItem("employeeId");
    const savedEmployeePassword = localStorage.getItem("password");

    if (savedEmployeeId) {
      form.setFieldsValue({
        employeeId: savedEmployeeId,
        password: savedEmployeePassword,
      });
      setRememberMe(true);
    }
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await loginEmployee(values);

      if (data) {
        const { token, employeeId, fullName, isAdmin, loginUserId } = data;
        localStorage.setItem("employeeId", employeeId);
        localStorage.setItem("token", token);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("loginUserId", loginUserId);
        setLoginUserId(loginUserId);
        setToken(token);
        setEmployeeId(employeeId);
        setIsAdmin(isAdmin);
        setFullName(fullName);
        notification.success({ message: "Login Successful" });

        navigate("/");
      }
    } catch (error) {
      notification.error({
        message: error.response?.data?.msg || "Login Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="./logo.png"
          className="mx-auto bg-black h-20 px-4 rounded-lg w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Flexisales HRMS Login
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form form={form} onFinish={onFinish} className="space-y-6">
          <Form.Item
            name="employeeId"
            rules={[
              { required: true, message: "Please input your Employee ID!" },
            ]}
          >
            <Input
              placeholder="Employee ID"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
          <div className="flex items-center justify-between">
            <div>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="text-sm"
              >
                Remember Me
              </Checkbox>
            </div>
            <div>
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
