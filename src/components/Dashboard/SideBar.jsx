import { Layout, Menu } from "antd";
import { useAuth } from "../../context/AuthContext";

import SideBarMenu from "./SideBarMenu";

const { Sider } = Layout;

const SideBar = () => {
  const { collapsed } = useAuth();


  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        className=""
        collapsed={!collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          zIndex: 100,
          left: 0,
          top: 0,
          bottom: 0,
          background: "#fbd808",
          color: "black",
        }}
      >
        <div className="flex items-center justify-center text-black py-6">
          {!collapsed ? (
            <span className="text-black font-semibold text-xl">Flexi</span>
          ) : (
            <span className="text-black font-semibold text-xl">Flexisales</span>
          )}
        </div>
        <SideBarMenu/>
      </Sider>
    </div>
  );
};

export default SideBar;
