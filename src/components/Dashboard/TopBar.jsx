import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useAuth } from "../../context/AuthContext";

const { Header } = Layout;

const TopBar = () => {
  const {
    fullName,
    collapsed,
    setCollapsed,
    setMobileSideBarOpen,
    colorBgContainer,
    token,
    logout,
  } = useAuth();

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setCollapsed(!collapsed);
    } else {
      setMobileSideBarOpen(true);
    }
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        position: "fixed",
        zIndex: 100,
        left: 0,
        top: 0,
      }}
      className={`w-full flex items-center transition-all duration-300 ${
        !collapsed ? "ml-0" : "ml-0"
      } ${!collapsed ? "md:ml-[80px]" : "md:ml-[200px]"} `}
    >
      <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3">
        <Button
          type="text"
          icon={!collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          // onClick={() => setCollapsed(!collapsed)}
          onClick={toggleSidebar}
          style={{
            fontSize: "16px",
            width: 48,
            height: 48,
          }}
        />
        <div
          className={`flex items-center ${
            collapsed ? "md:fixed md:right-[32px]" : "md:fixed md:right-[32px]"
          } ${
            collapsed ? "fixed right-[15px]" : "fixed right-[15px]"
          }  space-x-4`}
        >
          {token && (
            <Button
              type="dashed"
              onClick={() => logout()}
              className="flex items-center space-x-2"
            >
              {fullName} <LogoutOutlined />
            </Button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default TopBar;
