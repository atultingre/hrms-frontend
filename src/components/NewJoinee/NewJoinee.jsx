import { useAuth } from "../../context/AuthContext";
import { Avatar, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";

const NewJoinee = () => {
  const { newJoiners } = useAuth();

  return (
    <div className="p-4 bg-gradient-to-r from-green-100 to-green-300 border-2 border-black shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-2">New Joiners</h3>
      {newJoiners.length > 0 ? (
        <Carousel autoplay>
          {newJoiners.map((employee) => (
            <div
              key={employee._id}
              className="flex justify-center items-center py-4  rounded-lg"
            >
              <div className="flex justify-center flex-col py-4 items-center  rounded-lg">
                {employee.profilePicture ? (
                  <Avatar src={employee.profilePicture} size={100} />
                ) : (
                  <UserOutlined className="text-[100px]" />
                )}
                <h3 className="text-lg font-bold">{employee.name}</h3>
                <p>New Joiner</p>
                <p>
                  {employee.designation} | {employee.department} |{" "}
                  {employee.branch}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No new joiners this week.</p>
      )}
    </div>
  );
};

export default NewJoinee;
