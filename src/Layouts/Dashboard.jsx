import { Link, Outlet } from "react-router-dom";
import logo from "/shop-ex-logo.svg";
import useRole from "../hooks/useRole";
import Loading from "../Pages/Loading/Loading";

const Dashboard = () => {
  const { isRoleLoading } = useRole();
  if (isRoleLoading) {
    return <Loading />;
  }
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
