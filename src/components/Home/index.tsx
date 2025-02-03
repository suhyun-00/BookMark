import SideBar from "@components/SideBar";
import Dashboard from "@components/Dashboard";

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-100/60 backdrop-blur-xl">
      <SideBar />
      <Dashboard />
    </div>
  );
};

export default Home;
