import { Layout } from "antd";
import { useAuth } from "../../context/AuthContext";
import MobileSideBar from "./MobileSideBar";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useState } from "react";

const { Content } = Layout;

const Dashboard = ({ children }) => {
  const { collapsed, colorBgContainer, borderRadiusLG } = useAuth();

  return (
    <Layout>
      <div className="hidden md:block">
        <SideBar />
      </div>

      <div className="block md:hidden">
        <MobileSideBar  />
      </div>

      <Layout
        className={`${!collapsed ? "ml-0" : "ml-0"} ${
          !collapsed ? "md:ml-[80px]" : "md:ml-[200px]"
        } `}
      >
        <TopBar />
        <Content
          style={{
            margin: "90px 16px 18px 16px",
            minHeight: "82dvh",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
