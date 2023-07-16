import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import useExProvider from "../../../../hooks/useExProvider";
import Loading from "../../../Loading/Loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const AllAddedProducts = () => {
  const navigate = useNavigate();
  const { user } = useExProvider();
  const { axiosSecure } = useAxiosSecure();
  const {
    data: allAddedProducts = [],
    isLoading: addProductLoading,
    refetch,
  } = useQuery({
    queryKey: ["Added products"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `my-added-products?email=${user.email}`
        );
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  if (addProductLoading) {
    return <Loading />;
  }
  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `delete-product?email=${user.email}&&id=${id}`
          );
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Product deleted successfully.", "success");
            refetch();
          }
        } catch (err) {
          Swal.fire(
            "Deleted!",
            "Something went wrong. Try again later.",
            "error"
          );
        }
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Added products | Shop-Ex</title>
      </Helmet>
      <div className="overflow-x-scroll">
        <table className="table table-zebra font-inter font-semibold">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Sizes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allAddedProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.product_info.name}</td>
                <td>{product.product_info.seller_price}</td>
                <td>
                  <img
                    src={product.product_info.images[0]}
                    alt={product.product_info.name}
                    className="w-14 h-14"
                  />
                </td>
                <td>
                  <div>
                    {product?.product_info?.sizes?.map((item, index) => (
                      <span key={index}>{" " + item},</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/update-products/${product._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(product._id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllAddedProducts;
