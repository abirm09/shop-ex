import { Helmet } from "react-helmet-async";
import useExProvider from "../../../hooks/useExProvider";
import useRole from "../../../hooks/useRole";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Seller from "./Seller";

const Welcome = () => {
  const { user } = useExProvider();
  const { role } = useRole();
  const { axiosSecure } = useAxiosSecure();
  const { data: productsInfoCount = [] } = useQuery({
    queryKey: ["productInfoCount"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `seller-product-info-count?email=${user.email}`
      );
      return res.data;
    },
  });
  return (
    <>
      <Helmet>
        <title>Dashboard | Shop-Ex</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 items-center">
        <div className="col-span-1 ring-1 bg-slate-50 ring-slate-200 m-2 grid grid-cols-2 rounded-md py-5 shadow-md">
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
              <div className="dashboard-info-box">
                <h2>Total added Products: {productsInfoCount.totalAdded}</h2>
              </div>
              <div className="dashboard-info-box">
                <h2>Approved Products: {productsInfoCount.totalApproved}</h2>
              </div>
              <div className="dashboard-info-box">
                <h2>Pending Products: {productsInfoCount.totalPending}</h2>
              </div>
              <div className="dashboard-info-box">
                <h2>Rejected Products: {productsInfoCount.totalRejected}</h2>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center gap-5">
          {role === "customer" ? "" : role === "seller" ? <Seller /> : ""}
        </div>
      </div>
    </>
  );
};

export default Welcome;
