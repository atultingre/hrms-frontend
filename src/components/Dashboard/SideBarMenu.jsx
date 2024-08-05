import { Menu } from "antd";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosContacts, IoMdHome } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const SideBarMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      key: "/",
      icon: <IoMdHome />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/employees",
      icon: <FaUsers />,
      label: <Link to="/employees">Employees</Link>,
    },
    {
      key: "/employees/contact-details",
      icon: <IoIosContacts />,
      label: <Link to="/employees/contact-details">Contact details</Link>,
    },
    {
      key: "/employees/profile",
      icon: <IoIosContacts />,
      label: <Link to="/employees/profile">Profile</Link>,
    },
  ];

  return (
    <div>
      <Menu
        theme="light"
        style={{ background: "transparent" }}
        mode="inline"
        selectedKeys={[currentPath]}
        items={menuItems}
      />
    </div>
  );
};

export default SideBarMenu;
