import { useQuery } from "@tanstack/react-query";

const StaffInfo = ({ user, axiosSecure }) => {
  const { data: staffInfoCount = {} } = useQuery({
    queryKey: ["seller-info"],
    queryFn: async () => {
      const res = await axiosSecure.get(`staff-info-count?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <>
      <div className="dashboard-info-box">
        <h2>Total Products: {staffInfoCount.totalProducts}</h2>
      </div>
      <div className="dashboard-info-box">
        <h2>Pending for initial check: {staffInfoCount.pending_products}</h2>
      </div>
      <div className="dashboard-info-box">
        <h2>Approved products: {staffInfoCount.approved_products}</h2>
      </div>
      <div className="dashboard-info-box">
        <h2>Rejected products: {staffInfoCount.rejected_products}</h2>
      </div>
    </>
  );
};

export default StaffInfo;
