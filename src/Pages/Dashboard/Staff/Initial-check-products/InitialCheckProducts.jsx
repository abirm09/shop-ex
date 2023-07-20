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

const InitialCheckProducts = () => {
  const closeBtn = useRef();
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
      setCurrentProduct(res.data.result);
      setSingleProductLoading(false);
    } catch (err) {
      setSingleProductLoading(false);
      console.log(err);
    }
  };
  //handleApprove
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
                  <td>{product.product_info.name}</td>
                  <td>
                    <img
                      className="w-14 h-14"
                      src={product.product_info.images[0]}
                      alt={product.product_info.name}
                    />
                  </td>
                  <td>
                    <label
                      htmlFor="my_modal_6"
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
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-[95%] min-h-[90vh] h-full">
          {!singleProductLoading ? (
            <div className="w-full h-full overflow-y-scroll flex flex-col">
              <h3 className="font-bold text-lg font-inter">
                {currentProduct?.product_info?.name}
              </h3>
              <p className="py-4">This modal works with a hidden checkbox!</p>
              <div className=" mt-auto flex items-center justify-end gap-2">
                <button className="ex-btn bg-error">Reject</button>
                <button className="ex-btn bg-success" onClick={handleApprove}>
                  Approve
                </button>
                <div className="modal-action mt-0">
                  <label
                    htmlFor="my_modal_6"
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default InitialCheckProducts;
