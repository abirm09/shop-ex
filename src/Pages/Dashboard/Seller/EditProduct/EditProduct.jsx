import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import useExProvider from "../../../../hooks/useExProvider";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useExProvider();
  const { axiosSecure } = useAxiosSecure();
  // get current products
  const { data: currentProduct = {} } = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(
          `single-product-info?email=${user.email}&&id=${id}`,
          { updated: true }
        );
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  // handle product updating
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);
  console.log(currentProduct);
  return (
    <>
      <Helmet>
        {/* <title>
          Update Product - {currentProduct?.product_info?.name} | Shop-Ex
        </title> */}
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
      >
        <div>
          <label htmlFor="product_name" className="ex-label">
            Product name
          </label>
          <input
            className="ex-form"
            type="text"
            name="product_name"
            placeholder="I phone 14 pro max"
            {...register("product_name")}
          />
          {errors.product_name?.type === "required" && (
            <p role="alert" className="form-validate-error">
              Product name is required.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="product_price" className="ex-label">
            Price
          </label>
          <input
            className="ex-form"
            type="text"
            name="product_price"
            placeholder="200"
            {...register("product_price")}
          />
        </div>
        <div>
          <label htmlFor="available_quantity" className="ex-label">
            Available quantity.
          </label>
          <input
            className="ex-form"
            type="text"
            name="available_quantity"
            placeholder="20"
            {...register("available_quantity", { required: true })}
          />
          {errors.available_quantity?.type === "required" && (
            <p role="alert" className="form-validate-error">
              Quantity is required.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="product_images" className="ex-label">
            Product image
          </label>
          <input
            className="ex-form"
            type="file"
            name="product_images"
            {...register("product_images")}
          />
        </div>
      </form>
    </>
  );
};

export default EditProduct;
