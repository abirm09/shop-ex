import { Link, Outlet } from "react-router-dom";
import logo from "/shop-ex-logo.svg";
import ActiveLinks from "../components/ActiveLinks/ActiveLinks";
import useRole from "../hooks/useRole";
import { FaHome } from "react-icons/fa";
import Loading from "../Pages/Loading/Loading";

const Dashboard = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) {
    return <Loading />;
  }
  const sellerLinks = (
    <>
      <ActiveLinks to="/dashboard/welcome">
        <FaHome />
        Home
      </ActiveLinks>
    </>
  );
  return (
    <>
      <div className="ex-container">
        <div className="py-3 bg-base-100 flex justify-between px-3">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-36 btn btn-ghost" />
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
