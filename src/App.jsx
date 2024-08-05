import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home/Home";
import EmployeeList from "./components/Employee/EmployeeList/EmployeeList";
import ContactDetails from "./components/Employee/ContactDetails/ContactDetails";
import ProfilePicture from "./components/Profile/ProfilePicture";

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <LoginForm /> : <Navigate to={"/"} />}
      />
      <Route
        path="/employees/register"
        element={!token ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} />} />
      <Route
        path="/employees"
        element={token ? <EmployeeList /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/employees/contact-details"
        element={token ? <ContactDetails /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/employees/profile"
        element={token ? <ProfilePicture /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
};

export default App;
