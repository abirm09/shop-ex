import { Link, Outlet } from "react-router-dom";
import logo from "/shop-ex-logo.svg";
import { AiOutlineBars, AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { FaHome, FaShieldAlt, FaUserPlus } from "react-icons/fa";
import ActiveLinks from "../components/ActiveLinks/ActiveLinks";
import useRole from "../hooks/useRole";

const Accounts = () => {
  const { role } = useRole();
  return (
    <div className="ex-container">
      <div className="py-3 bg-base-100 flex justify-between px-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36 btn btn-ghost" />
        </Link>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-accent drawer-button lg:hidden"
        >
          <AiOutlineBars />
        </label>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ml-3">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content font-inter font-semibold">
            {/* Sidebar content here */}
            <ActiveLinks to="/">
              <FaHome /> Back to home
            </ActiveLinks>
            <ActiveLinks to="/accounts/settings">
              <AiOutlineUser /> Profile Settings
            </ActiveLinks>
            <ActiveLinks to="/accounts/change-password">
              <FaShieldAlt /> Change password
            </ActiveLinks>
            <ActiveLinks to="/accounts/become-a-seller">
              <FaUserPlus /> Become a seller
            </ActiveLinks>

            {role === "customer" ? (
              <>
                <hr className="my-3" />
                <ActiveLinks to="delete-account">
                  <AiOutlineDelete /> Delete Your Account
                </ActiveLinks>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
