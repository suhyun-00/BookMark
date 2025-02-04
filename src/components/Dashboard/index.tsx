import Header from "@components/Dashboard/Header";
import View from "@components/Dashboard/View";

interface DashboardProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard = ({ setIsOpen }: DashboardProps) => {
  return (
    <div className="ml-64 min-h-screen w-screen">
      <Header setIsOpen={setIsOpen} />
      <View />
    </div>
  );
};

export default Dashboard;
