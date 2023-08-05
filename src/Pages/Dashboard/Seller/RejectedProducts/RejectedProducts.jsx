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
  //correction done
  const handleCorrectionDone = async (id, status) => {
    try {
      const res = await axiosSecure.post(
        `correction-done?email=${user.email}&&id=${id}&&status=${status}`
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
      {rejectedProducts.length ? (
        <div className="overflow-x-auto">
          <table className="table font-inter">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Product name</th>
                <th>Image</th>
                <th>Rejected Employee</th>
                <th>Employee type</th>
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
                  <td>
                    {item.status === "rejected"
                      ? item?.rejected_by?.staffEmail
                      : item?.rejected_admin?.adminEmail}
                  </td>
                  <td>
                    {item.status === "rejected" ? (
                      <button className="ex-btn bg-primary text-white">
                        Staff
                      </button>
                    ) : (
                      <button className="ex-btn bg-secondary text-white">
                        Admin
                      </button>
                    )}
                  </td>
                  <td className="text-red-700 font-bold">
                    {item.status === "rejected"
                      ? item?.rejected_reason
                      : item?.admin_rejected_reason}
                  </td>
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
                      onClick={() =>
                        handleCorrectionDone(item._id, item.status)
                      }
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
      ) : (
        <h2 className="text-center text-green-700 font-inter font-bold ">
          Currently You do not have any rejected products.
        </h2>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default RejectedProducts;
