import { Link } from "react-router-dom";
import ActiveLinks from "../../../components/ActiveLinks/ActiveLinks";
import { ImSearch } from "react-icons/im";
import ProductSearch from "../../../components/ProductSearch/ProductSearch";
import { useState } from "react";

const Header = () => {
  const [searchStatus, setSearchStatus] = useState(false);
  const navLink = (
    <>
      <ActiveLinks to="/">Home</ActiveLinks>
      <ActiveLinks to="/category">Category</ActiveLinks>
    </>
  );
  return (
    <header>
      <div className="bz-container">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-semibold"
              >
                {navLink}
              </ul>
            </div>
            <Link to="/">
              <img
                src="https://i.ibb.co/hKDg5F6/logo-main.png"
                alt="Logo"
                className="w-32 btn btn-ghost"
              />
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
              <li>A</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
