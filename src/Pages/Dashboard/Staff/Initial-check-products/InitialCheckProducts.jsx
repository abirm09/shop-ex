import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import useExProvider from "../../../../hooks/useExProvider";
import { Helmet } from "react-helmet-async";
import Loading from "../../../Loading/Loading";
import { FaInfoCircle } from "react-icons/fa";
import { useRef, useState } from "react";
import loadingAnim from "../../../../assets/loading/loading-anim-2.json";
import Lottie from "lottie-react";
import { Toaster, toast } from "react-hot-toast";
import ProductViewOnModal from "../../../../components/ProjuctViewOnModal/ProductViewOnModal";

const InitialCheckProducts = () => {
  const rejectReason = useRef();
  const closeBtn = useRef();
  const rejectModalClose = useRef();
  const [currentProduct, setCurrentProduct] = useState({});
  const [singleProductLoading, setSingleProductLoading] = useState(false);
  const { user } = useExProvider();
  const { axiosSecure } = useAxiosSecure();
  const {
    data: pendingProducts = [],
    isLoading: pendingProductLoading,
    refetch: pendingProductReFetch,
  } = useQuery({
    queryKey: ["pending-products"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `/pending-products?email=${user.email}`
        );
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  if (pendingProductLoading) {
    return <Loading />;
  }
  const handleDetails = async id => {
    setSingleProductLoading(true);
    try {
      const res = await axiosSecure.get(`single-product?id=${id}`);
      setCurrentProduct(res.data);
      setSingleProductLoading(false);
    } catch (err) {
      setSingleProductLoading(false);
      console.log(err);
    }
  };
  //handle Approve
  const handleApprove = async () => {
    try {
      const res = await axiosSecure.put(
        `initial-check-product?id=${currentProduct._id}&&name=${user.displayName}&&email=${user.email}`
      );
      pendingProductReFetch();
      closeBtn.current.click();
      if (res.data.matchedCount) {
        toast.success("Approved successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong. Pleas try again later.");
    }
  };
  //handle reject
  const handleReject = async () => {
    const reason = rejectReason.current.value;
    if (!reason) {
      return toast.error("Reason must be given.");
    }
    try {
      const res = await axiosSecure.put(
        `/reject-initial?email=${user.email}&&id=${currentProduct._id}&&name=${user.displayName}`,
        {
          reason,
        }
      );
      if (res.data.modifiedCount >= 1) {
        toast.success("Rejected successfully.");
        rejectModalClose.current.click();
        closeBtn.current.click();
        pendingProductReFetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Pending products | Shop-Ex</title>
      </Helmet>
      <div>
        <h2 className="section-title">All pending products</h2>
        <div className="overflow-x-auto mt-20">
          <table className="table rounded-lg overflow-hidden">
            {/* head */}
            <thead>
              <tr className="bg-slate-900 text-white rounded-t-lg font-inter text-sm">
                <th></th>
                <th>Product Name</th>
                <th>Seller email</th>
                <th>Product image</th>
                <th>View details</th>
              </tr>
            </thead>
            <tbody className="font-inter font-semibold">
              {pendingProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className={`${index % 2 === 1 ? "bg-base-200" : ""}`}
                >
                  <td>{index + 1}</td>
                  <td>{product?.product_info?.name}</td>
                  <td>{product?.seller_info?.email}</td>
                  <td>
                    <img
                      className="w-14 h-14"
                      src={product?.product_info?.images[0]}
                      alt={product?.product_info?.name}
                    />
                  </td>
                  <td>
                    <label
                      htmlFor="product_manage_modal"
                      onClick={() => handleDetails(product._id)}
                    >
                      <FaInfoCircle className="w-7 h-7" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <input
        type="checkbox"
        id="product_manage_modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[95%] min-h-[90vh] h-full">
          {!singleProductLoading ? (
            <div className="w-full h-full overflow-y-scroll flex flex-col">
              <ProductViewOnModal currentProduct={currentProduct} />
              <div className="mt-auto flex items-center justify-end gap-2">
                <label
                  className="ex-btn bg-error"
                  htmlFor="reject_reason_modal"
                >
                  Reject
                </label>
                <button className="ex-btn bg-success" onClick={handleApprove}>
                  Approve
                </button>
                <div className="modal-action mt-0">
                  <label
                    htmlFor="product_manage_modal"
                    className="ex-btn bg-base-300"
                    ref={closeBtn}
                  >
                    Close!
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-start z-30">
              <div className="w-full h-screen flex justify-center items-center flex-col fixed left-0 top-0">
                <Lottie
                  className="w-20 h-20 md:w-20 md:h-20"
                  animationData={loadingAnim}
                  loop={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* modal 2 */}
      <input
        type="checkbox"
        id="reject_reason_modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Write the reason for rejecting the product.
          </h3>
          <input
            type="text"
            ref={rejectReason}
            className="input input-bordered w-full mt-5 input-info"
            defaultValue="This is a reason for rejecting this product."
          />
          <div className="flex justify-end items-end gap-3">
            <button className="ex-btn bg-error" onClick={handleReject}>
              Reject
            </button>
            <div className="modal-action">
              <label
                htmlFor="reject_reason_modal"
                className="ex-btn bg-base-300"
                ref={rejectModalClose}
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default InitialCheckProducts;
