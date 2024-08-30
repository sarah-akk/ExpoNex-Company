import Profile from "layouts/Profile/Profile";
import Navbar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Home from "layouts/Home/Home";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="NavBar">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Dashboard;
