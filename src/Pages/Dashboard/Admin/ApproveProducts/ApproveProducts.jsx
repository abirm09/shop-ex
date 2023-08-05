import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import useExProvider from "../../../../hooks/useExProvider";
import { Helmet } from "react-helmet-async";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import ProductViewOnModal from "../../../../components/ProjuctViewOnModal/ProductViewOnModal";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const ApproveProducts = () => {
  const closeBtn = useRef();
  const rejectReason = useRef();
  const rejectModalClose = useRef();
  const { user } = useExProvider();
  const { axiosSecure } = useAxiosSecure();
  const [currentProduct, setCurrentProduct] = useState({});
  const { data: checkedProducts = [], refetch: checkedProductRefresh } =
    useQuery({
      queryKey: ["checked products"],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get(
            `checked-products?email=${user.email}`
          );
          return res.data;
        } catch (error) {
          console.log(error);
        }
      },
    });
  const handleDetails = async id => {
    try {
      const res = await axiosSecure.get(`single-product?id=${id}`);
      setCurrentProduct(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleApprove = async () => {
    try {
      const res = await axiosSecure.post(
        `approve-by-admin?email=${user.email}&&id=${currentProduct._id}&&displayName=${user.displayName}`
      );
      if (res.data.matchedCount) {
        toast.success("Approved successfully.");
        closeBtn.current.click();
        checkedProductRefresh();
      }
    } catch (error) {
      toast.err(error.message);
    }
  };
  const handleReject = async () => {
    const reason = rejectReason.current.value;
    if (!reason) {
      return toast.error("Please provide a reason.");
    }
    try {
      const res = await axiosSecure.post(
        `rejected-by-admin?email=${user.email}&&name=${user.displayName}&&id=${currentProduct._id}`,
        { reason }
      );
      if (res.data.modifiedCount) {
        toast.success("Rejected successfully.");
        rejectModalClose.current.click();
        closeBtn.current.click();
        checkedProductRefresh();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Approve Product | Shop-Ex</title>
      </Helmet>
      <h2 className="section-title">Pending for approval</h2>
      {checkedProducts.length ? (
        <>
          <div className="overflow-x-auto mt-20">
            <table className="table table-zebra rounded-lg overflow-hidden">
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
              <tbody className="font-inter font-bold">
                {checkedProducts.map((product, index) => (
                  <tr key={product._id}>
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
        </>
      ) : (
        <h2 className="text-center text-green-700 font-inter font-bold mt-10">
          No products is pending for approval.
        </h2>
      )}
      <input
        type="checkbox"
        id="product_manage_modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-[95%] min-h-[90vh] h-full">
          <div className="w-full h-full overflow-y-scroll flex flex-col">
            <ProductViewOnModal currentProduct={currentProduct} />
            <div className="mt-auto flex items-center justify-end gap-2">
              <label className="ex-btn bg-error" htmlFor="reject_reason_modal">
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
        </div>
      </div>
      {/* Modal 2 */}
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

export default ApproveProducts;
