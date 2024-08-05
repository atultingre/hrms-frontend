import { useState } from "react";
import { Drawer } from "antd";
import { useAuth } from "../../context/AuthContext";
import SideBarMenu from "./SideBarMenu";
const MobileSideBar = () => {
  const { mobileSideBarOpen, setMobileSideBarOpen } = useAuth();
  const [placement, setPlacement] = useState("top");

  const onClose = () => {
    setMobileSideBarOpen(false);
  };

  return (
    <Drawer
      destroyOnClose
      title="Basic Drawer"
      placement={placement}
      closable={true}
      onClose={onClose}
      open={mobileSideBarOpen}
      key={placement}
    >
      <SideBarMenu />
    </Drawer>
  );
};
export default MobileSideBar;
