import { theme } from "antd";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [employeeId, setEmployeeId] = useState(
    localStorage.getItem("employeeId") || null
  );
  const [loginUserId, setLoginUserId] = useState(
    localStorage.getItem("loginUserId") || null
  );
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || null
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || null
  );
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);

  const [workAnniversary, setWorkAnniversary] = useState([]);
  const [newJoiners, setNewJoiners] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeId");
    localStorage.removeItem("password");
    localStorage.removeItem("fullName");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("loginUserId");
    setToken(null);
    setLoginUserId(null);
    setEmployeeId(null);
    setFullName(null);
    setIsAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUserId,
        setLoginUserId,
        workAnniversary,
        setWorkAnniversary,
        newJoiners,
        setNewJoiners,
        mobileSideBarOpen,
        setMobileSideBarOpen,
        fullName,
        setFullName,
        collapsed,
        setCollapsed,
        colorBgContainer,
        borderRadiusLG,
        token,
        setToken,
        employeeId,
        setEmployeeId,
        logout,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
