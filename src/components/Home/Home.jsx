import TodaysThought from "../Thought/TodaysThought";
import Birthday from "../Birthday/Birthday";
import WorkAnniversary from "../WorkAnniversary/WorkAnniversary";
import Calendar from "../Calender/Calendar";
import CorporateGuidelines from "../CorporateGuidelines/CorporateGuidelines";
import Clock from "../Clock/Clock";
import Dashboard from "../Dashboard/Dashboard";
import NewJoinee from "../NewJoinee/NewJoinee";

const Home = () => {
  return (
    <Dashboard>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        <NewJoinee />
        <WorkAnniversary />
        <Birthday />
        <TodaysThought />
        {/* <Clock /> */}
        <Calendar />
        <CorporateGuidelines className="lg:col-span-2" />
      </div>
    </Dashboard>
  );
};

export default Home;
