import { useQuery } from "@tanstack/react-query";

const AdminInfo = ({ user, axiosSecure }) => {
  const { data: adminInfoCount = [] } = useQuery({
    queryKey: ["Admin info count"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `admin-info-count?email=${user.email}`
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="dashboard-info-box">
        <h2>Total Products : {adminInfoCount?.totalProducts}</h2>
      </div>
      <div className="dashboard-info-box">
        <h2>Pending for approval : {adminInfoCount?.pendingApproval}</h2>
      </div>
      <div className="dashboard-info-box">
        <h2>Approved products : {adminInfoCount?.approveProducts}</h2>
      </div>
      <div className="dashboard-info-box">
        <h2>Admin rejected products : {adminInfoCount?.rejectedProducts}</h2>
      </div>
    </>
  );
};

export default AdminInfo;
