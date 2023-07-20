import { useQuery } from "@tanstack/react-query";

const SellerInfo = ({ user, axiosSecure }) => {
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
  );
};

export default SellerInfo;
