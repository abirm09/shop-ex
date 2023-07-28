import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import useExProvider from "../../../../hooks/useExProvider";
import { BiEditAlt } from "react-icons/bi";
import { TiInputChecked } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import BackButton from "../../../../components/BackButton/BackButton";
import { Helmet } from "react-helmet-async";

const RejectedProducts = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useExProvider();
  const { data: rejectedProducts = [], refetch: rejectedProductRefresh } =
    useQuery({
      queryKey: ["rejected-products"],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get(
            `sellers-rejected-products?email=${user.email}`
          );
          return res.data;
        } catch (err) {
          console.log(err);
        }
      },
    });
  console.log(rejectedProducts);
  //correction done
  const handleCorrectionDone = async id => {
    try {
      const res = await axiosSecure.post(
        `correction-done?email=${user.email}&&id=${id}`
      );
      if (res.data.matchedCount > 0) {
        rejectedProductRefresh();
        toast.success("Updated");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Rejected products | Shop-Ex</title>
      </Helmet>
      <BackButton />
      <div className="overflow-x-auto">
        <table className="table font-inter">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product name</th>
              <th>Image</th>
              <th>Rejected staff</th>
              <th>Reason</th>
              <th>Edit</th>
              <th>Correction done</th>
            </tr>
          </thead>
          <tbody>
            {rejectedProducts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.product_info.name}</td>
                <td>
                  <img
                    src={item.product_info.images[0]}
                    alt={item.product_info.name}
                    className="w-10 h-10"
                  />
                </td>
                <td>{item.rejected_by.staffEmail}</td>
                <td>{item.rejected_reason}</td>
                <td>
                  <Link
                    to={`/dashboard/update-products/${item._id}`}
                    className=""
                  >
                    <BiEditAlt className="w-6 h-6" />
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleCorrectionDone(item._id)}
                    title="Correction done"
                  >
                    <TiInputChecked className="w-7 h-7" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default RejectedProducts;
