import { Helmet } from "react-helmet-async";
import useExProvider from "../../../hooks/useExProvider";
import useRole from "../../../hooks/useRole";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Seller from "./Seller";
import SellerInfo from "../../../components/SellerInfo/SellerInfo";
import StaffInfo from "../../../components/StaffInfo/StaffInfo";
import Staff from "./Staff";
import Admin from "./Admin";
import AdminInfo from "../../../components/AdminInfo/AdminInfo";

const Welcome = () => {
  const { user } = useExProvider();
  const { role } = useRole();
  const { axiosSecure } = useAxiosSecure();
  return (
    <>
      <Helmet>
        <title>Dashboard | Shop-Ex</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 items-center">
        <div className="col-span-1 ring-1 bg-slate-50 ring-slate-200 m-2 grid grid-cols-2 rounded-md pt-5 shadow-md">
          <div className="col-span-2 text-center mb-2">
            <img
              className="rounded-full w-14 h-14 object-cover mx-auto"
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://i.ibb.co/rvRhzBn/empty-user.png"
              }
              alt="User profile"
            />
            <h2 className="font-concert text-3xl">
              <Link to="/accounts/settings">{user.displayName}</Link>
            </h2>
            <p className="font-inter font-semibold">
              Shop-ex <span className="capitalize">{role}</span>
            </p>
            <p className="font-inter font-semibold">{user.email}</p>
          </div>
          {role === "customer" ? (
            ""
          ) : role === "seller" ? (
            <>
              {/* =============================Seller info=========================== */}
              <SellerInfo user={user} axiosSecure={axiosSecure} />
            </>
          ) : role === "staff" ? (
            <>
              {/* =============================Staff links=========================== */}
              <StaffInfo user={user} axiosSecure={axiosSecure} />
            </>
          ) : role === "admin" ? (
            <AdminInfo user={user} axiosSecure={axiosSecure} />
          ) : (
            ""
          )}
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center gap-5 flex-wrap">
          {role === "customer" ? (
            ""
          ) : role === "seller" ? (
            <Seller />
          ) : role === "staff" ? (
            <Staff />
          ) : role === "admin" ? (
            <Admin />
          ) : (
            "Something went wrong"
          )}
        </div>
      </div>
    </>
  );
};

export default Welcome;
