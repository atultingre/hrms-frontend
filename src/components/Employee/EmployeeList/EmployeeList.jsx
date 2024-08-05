import React, { useEffect, useState } from "react";
import { Table, Button, notification } from "antd";
import { getEmployees, deleteEmployee } from "../../../api/ApiService";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../Dashboard/Dashboard";
import moment from "moment";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
      } catch (error) {
        notification.error({ message: "Failed to fetch employees" });
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
      notification.success({ message: "Employee deleted successfully" });
    } catch (error) {
      notification.error({ message: "Failed to delete employee" });
    }
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
      sortDirections: ["ascend", "descend"],
      width: 150,
    },
    { title: "Name", dataIndex: "name", key: "name", width: 200 },
    { title: "Gender", dataIndex: "gender", key: "gender", width: 100 },
    {
      title: "Father's Name",
      dataIndex: "fathersName",
      key: "fathersName",
      width: 150,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      width: "200px !important",
    },
    {
      title: "Confirmation Date",
      dataIndex: "confirmationDate",
      key: "confirmationDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      width: 150,
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
      width: 200,
    },
    {
      title: "Bank Account Number",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      width: 200,
    },
    {
      title: "Aadhar Number",
      dataIndex: "aadharNumber",
      key: "aadharNumber",
      width: 200,
    },
    {
      title: "UAN Number",
      dataIndex: "uanNumber",
      key: "uanNumber",
      width: 150,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 150,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      width: 150,
    },
    { title: "Division", dataIndex: "division", key: "division", width: 150 },
    {
      title: "Main Division",
      dataIndex: "mainDivision",
      key: "mainDivision",
      width: 150,
    },
    {
      title: "Sub Division",
      dataIndex: "subDivision",
      key: "subDivision",
      width: 150,
    },

    // { title: "password", dataIndex: "password", key: "password", width: 150 },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (isAdmin ? "Yes" : "No"),
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      // fixed: "right",
      width: 200,
      render: (text, record) => (
        <>
          <Button
            onClick={() => navigate(`/employees/edit/${record._id}`)}
            type="primary"
            className="mr-2"
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(record._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Dashboard>
      <div className="overflow-x-auto">
        <Table
          dataSource={employees}
          columns={columns}
          rowKey="_id"
          scroll={{ x: 1500 }}
          // pagination={{ pageSize: 10 }}
        />
      </div>
    </Dashboard>
  );
};

export default EmployeeList;
