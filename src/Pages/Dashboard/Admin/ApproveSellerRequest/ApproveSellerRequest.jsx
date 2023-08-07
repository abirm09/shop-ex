import { Helmet } from "react-helmet-async";
import BackButton from "../../../../components/BackButton/BackButton";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useExProvider from "../../../../hooks/useExProvider";
import { BiSolidCheckCircle } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";

const ApproveSellerRequest = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useExProvider();
  const { data: sellerRequests = [], refetch: refetchSellerREquest } = useQuery(
    {
      queryKey: ["seller-request"],
      queryFn: async () => {
        try {
          const result = await axiosSecure.get(
            `requested-seller?email=${user.email}`
          );
          return result.data;
        } catch (error) {
          console.log(error);
        }
      },
    }
  );
  const handleSellerApprove = async email => {
    try {
      const result = await axiosSecure.post(
        `approve-seller-request?email=${user.email}&&reqEmail=${email}`
      );
      if (result.data.modifiedCount) {
        toast.success("Approved successfully.");
        refetchSellerREquest();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Approve seller request | Shop-Ex</title>
      </Helmet>
      <BackButton />
      <h2 className="section-title">Seller requests</h2>
      {sellerRequests.length ? (
        <div className="overflow-x-auto">
          <table className="table font-inter">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Seller name</th>
                <th>Profile image</th>
                <th>Email</th>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {sellerRequests.map((seller, index) => (
                <tr key={seller._id}>
                  <td>{index + 1}</td>
                  <td>{seller.name}</td>
                  <td>
                    <img
                      className="w-12 h-12 rounded-full"
                      src={seller.profilePic}
                      alt={seller.name}
                    />
                  </td>
                  <td>{seller.email}</td>
                  <td className="flex gap-5 items-center  ">
                    <button>
                      <AiFillCloseCircle className="w-6 h-6" />
                    </button>
                    <button onClick={() => handleSellerApprove(seller.email)}>
                      <BiSolidCheckCircle className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-center text-green-600 font-semibold">
          No seller request are pending.
        </h2>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ApproveSellerRequest;
