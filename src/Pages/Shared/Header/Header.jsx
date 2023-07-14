import { Link } from "react-router-dom";
import ActiveLinks from "../../../components/ActiveLinks/ActiveLinks";
import { ImSearch } from "react-icons/im";
import ProductSearch from "../../../components/ProductSearch/ProductSearch";
import { useState } from "react";
import useExProvider from "../../../hooks/useExProvider";
import { AiFillSetting } from "react-icons/ai";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import logo from "/shop-ex-logo.svg";
import useRole from "../../../hooks/useRole";
const Header = () => {
  const [searchStatus, setSearchStatus] = useState(false);
  const { user, logOutUser } = useExProvider();
  const { role } = useRole();
  const navLink = (
    <>
      <ActiveLinks to="/">Home</ActiveLinks>
      <ActiveLinks to="/category">Category</ActiveLinks>
    </>
  );
  const customerLinks = (
    <>
      <li>
        <Link to="/dashboard/cart">
          <FaShoppingCart /> Cart <div className="badge badge-ghost"></div>
        </Link>
      </li>
    </>
  );
  return (
    <header className="z-50">
      <div className="ex-container">
        <div className="navbar bg-base-100 font-inter">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-semibold z-50"
              >
                {navLink}
              </ul>
            </div>
            <Link to="/">
              <img src={logo} alt="Logo" className="w-32 btn btn-ghost" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-semibold">
              {navLink}
            </ul>
          </div>
          <div className="navbar-end">
            <ul className="flex items-center gap-5">
              <li
                className={`${
                  searchStatus ? "scale-100" : "scale-0"
                } hidden xl:block transition-all`}
              >
                <ProductSearch />
              </li>
              <li
                className={`${
                  searchStatus ? "scale-100" : "scale-0"
                } fixed xl:hidden right-3 w-full top-[64px] flex justify-end transition-all`}
              >
                <ProductSearch />
              </li>
              <li
                className="w-10 h-10 hover:bg-slate-100 flex justify-center items-center rounded-full cursor-pointer hover:ring-1 ring-slate-300 transition-all"
                onClick={() => setSearchStatus(!searchStatus)}
              >
                <ImSearch className="w-5 h-5" />
              </li>
              <li className="">
                {user ? (
                  //starting
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-12 rounded-full">
                        <img
                          className="rounded-full"
                          src={
                            user.photoURL
                              ? user.photoURL
                              : "https://i.ibb.co/rvRhzBn/empty-user.png"
                          }
                          alt="User profile"
                        />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 font-inter space-y-1 font-semibold z-50"
                    >
                      <li>
                        <img
                          className="w-10 h-10 p-0 rounded-full mx-auto object-cover"
                          src={
                            user.photoURL
                              ? user.photoURL
                              : "https://i.ibb.co/rvRhzBn/empty-user.png"
                          }
                          alt="User profile pic"
                        />
                        <h4 className="font-bold pointer-events-none justify-center">
                          {user.displayName}
                        </h4>
                        <h5 className="text-xs pointer-events-none justify-center">
                          {user.email}
                        </h5>
                      </li>
                      <li>
                        <Link to="/accounts/settings">
                          <AiFillSetting /> Settings
                        </Link>
                      </li>
                      {role === "customer" ? customerLinks : ""}
                      <li>
                        <Link to="/dashboard/welcome">
                          <IoAnalyticsOutline /> Dashboard
                        </Link>
                      </li>
                      <hr />
                      <li onClick={() => logOutUser()}>
                        <a>
                          {" "}
                          <FaSignOutAlt /> Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  // end
                  <>
                    <Link
                      to="login"
                      className="btn ring-1 ring-slate-300 normal-case btn-sm"
                    >
                      Login
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
