import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { getBirthdayDetails } from "../../api/ApiService";
import { Avatar, Carousel, notification } from "antd";

const Birthday = () => {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getBirthdayDetails();
        setBirthdays(data);
      } catch (error) {
        notification.error({ message: "Failed to fetch employees" });
      }
    };
    fetchEmployees();
  }, []);

  // Helper function to calculate age
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Helper function to get the ordinal suffix
  const getOrdinalSuffix = (number) => {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) {
      return number + "st";
    }
    if (j === 2 && k !== 12) {
      return number + "nd";
    }
    if (j === 3 && k !== 13) {
      return number + "rd";
    }
    return number + "th";
  };

  // Filter employees who have birthdays today
  const today = new Date();
  const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;

  const todayBirthdays = birthdays.filter((employee) => {
    const dob = new Date(employee.dateOfBirth);
    const dobMonthDay = `${dob.getMonth() + 1}-${dob.getDate()}`;
    return dobMonthDay === todayMonthDay;
  });

  return (
    <div className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-300 border-2 border-black shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-2">Today's Birthday</h3>

      {todayBirthdays.length > 0 ? (
        todayBirthdays.map((employee) => {
          const age = calculateAge(employee.dateOfBirth);
          return (
            <Carousel key={employee._id} autoplay>
              <div className="flex  items-center py-4 rounded-lg">
                <div className="flex flex-col py-4 justify-center items-center">
                {employee.profilePicture ? (
                  <Avatar src={employee.profilePicture} size={100} />
                ) : (
                  <UserOutlined className="text-[100px]" />
                )}
                  <h3 className="text-lg font-bold">{employee.name}</h3>
                  <p>{getOrdinalSuffix(age)} birthday</p>
                  <p>
                    {employee.designation} | {employee.department} |{" "}
                    {employee.branch}
                  </p>
                </div>
              </div>
            </Carousel>
          );
        })
      ) : (
        <p>No birthdays today!</p>
      )}
    </div>
  );
};

export default Birthday;
