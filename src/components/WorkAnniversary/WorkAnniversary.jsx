import { useEffect, useState } from "react";
import { getWorkAnniversaryDetails } from "../../api/ApiService";
import { UserOutlined } from "@ant-design/icons";
import { notification, Carousel, Avatar } from "antd";
import { useAuth } from "../../context/AuthContext";

const calculateYearsCompleted = (joiningDate) => {
  const today = new Date();
  const joinDate = new Date(joiningDate);
  let years = today.getFullYear() - joinDate.getFullYear();
  const monthDiff = today.getMonth() - joinDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < joinDate.getDate())
  ) {
    years--;
  }

  return years;
};

const WorkAnniversary = () => {
  const { workAnniversary, setWorkAnniversary, setNewJoiners } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getWorkAnniversaryDetails();
        const today = new Date();
        const currentMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

        const filteredEmployees = data.filter((employee) => {
          const joinDate = new Date(employee.joiningDate);
          return (
            `${joinDate.getMonth() + 1}-${joinDate.getDate()}` ===
            currentMonthDay
          );
        });

        const updatedEmployees = filteredEmployees.map((employee) => ({
          ...employee,
          yearsCompleted: calculateYearsCompleted(employee.joiningDate),
        }));

        // Separate employees into those with completed years and new joiners
        const withYearsCompleted = updatedEmployees.filter(
          (emp) => emp.yearsCompleted > 0
        );

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        const newJoiners = updatedEmployees.filter(
          (emp) =>
            new Date(emp.joiningDate) >= oneWeekAgo && emp.yearsCompleted === 0
        );

        setWorkAnniversary(withYearsCompleted);
        setNewJoiners(newJoiners);
      } catch (error) {
        notification.error({ message: "Failed to fetch employees" });
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-red-100 to-red-300 border-2 border-black  shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-2">Work Anniversary</h3>

      {workAnniversary.length > 0 && (
        <>
          <Carousel autoplay>
            {workAnniversary.map((employee) => (
              <div
                key={employee._id}
                className="flex items-center py-4 rounded-lg"
              >
                <div className="flex flex-col py-4 justify-center items-center">
                  {employee.profilePicture ? (
                    <Avatar src={employee.profilePicture} size={100} />
                  ) : (
                    <UserOutlined className="text-[100px]" />
                  )}
                  <h3 className="text-lg font-bold">{employee.name}</h3>
                  <p>{employee.yearsCompleted} Years completed</p>
                  <p>
                    {employee.designation} | {employee.department} |{" "}
                    {employee.branch}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </>
      )}

      {workAnniversary.length === 0 && <p>No work anniversaries today.</p>}
    </div>
  );
};

export default WorkAnniversary;
