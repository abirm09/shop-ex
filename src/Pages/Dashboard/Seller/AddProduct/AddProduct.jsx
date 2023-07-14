import { Helmet } from "react-helmet-async";
import BackButton from "../../../../components/BackButton/BackButton";
import { useForm } from "react-hook-form";
import useExProvider from "../../../../hooks/useExProvider";
import { useState } from "react";

const AddProduct = () => {
  const { user } = useExProvider();
  const [sizes, setSizes] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSize = (position, name) => {
    const newSize = { position, name };
    if (sizes.length) {
      for (const size of sizes) {
        if (size.name === name) {
          setSizes(sizes.filter(item => item.name !== name));
        } else {
          setSizes([...sizes, newSize]);
        }
      }
    } else {
      setSizes([newSize]);
    }
  };
  // console.log(sizes);
  const onSubmit = data => console.log(data);
  return (
    <>
      <Helmet>
        <title>Add new product | Shop-Ex</title>
      </Helmet>
      <div className="ex-container">
        <BackButton />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div>
            <label htmlFor="seller_name" className="ex-label">
              Seller name
            </label>
            <input
              className="ex-form"
              type="text"
              name="seller_name"
              defaultValue={user.displayName}
              readOnly
              {...register("seller_name")}
            />
          </div>
          <div>
            <label htmlFor="seller_email" className="ex-label">
              Seller Email
            </label>
            <input
              className="ex-form"
              type="text"
              name="seller_email"
              defaultValue={user.email}
              readOnly
              {...register("seller_email")}
            />
          </div>
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
            <label htmlFor="product_price" className="ex-label w-full">
              Available sizes
            </label>
            <input
              type="checkbox"
              name="size"
              value="xs"
              id="xs"
              onChange={() => handleSize(1, "XS")}
            />
            <label htmlFor="xs" className="ex-label cursor-pointer ms-1">
              xs
            </label>
            <input
              type="checkbox"
              name="size"
              value="sm"
              id="sm"
              onChange={() => handleSize(2, "sm")}
              className="ms-3"
            />
            <label htmlFor="sm" className="ex-label cursor-pointer ms-1">
              sm
            </label>
            <input
              type="checkbox"
              name="size"
              value="md"
              id="md"
              onChange={() => handleSize(3, "md")}
              className="ms-3"
            />
            <label htmlFor="md" className="ex-label cursor-pointer ms-1">
              md
            </label>
            <input
              type="checkbox"
              name="size"
              value="lg"
              id="lg"
              onChange={() => handleSize(4, "lg")}
              className="ms-3"
            />
            <label htmlFor="lg" className="ex-label cursor-pointer ms-1">
              lg
            </label>
            <input
              type="checkbox"
              name="size"
              value="xl"
              id="xl"
              onChange={() => handleSize(5, "xl")}
              className="ms-3"
            />
            <label htmlFor="xl" className="ex-label cursor-pointer ms-1">
              xl
            </label>
            <input
              type="checkbox"
              name="size"
              value="xxl"
              id="xxl"
              onChange={() => handleSize(6, "xxl")}
              className="ms-3"
            />
            <label htmlFor="xxl" className="ex-label cursor-pointer ms-1">
              xxl
            </label>
            <input
              type="checkbox"
              name="size"
              value="xxxl"
              id="xxxl"
              onChange={() => handleSize(7, "xxxl")}
              className="ms-3"
            />
            <label htmlFor="xxxl" className="ex-label cursor-pointer ms-1">
              xxxl
            </label>
          </div>
          <div>
            <label htmlFor="ratings" className="ex-label">
              Ratings
            </label>
            <input
              className="ex-form"
              type="text"
              name="ratings"
              placeholder="0-5"
              {...register("ratings")}
            />
          </div>
          <div>
            <label htmlFor="available_quantity" className="ex-label">
              Available quantity
            </label>
            <input
              className="ex-form"
              type="text"
              name="available_quantity"
              placeholder="20"
              {...register("available_quantity")}
            />
          </div>
          <div>
            <label htmlFor="image_links" className="ex-label">
              Image link
            </label>
            <input
              className="ex-form"
              type="text"
              name="image_links"
              placeholder="http://example.com/image.jpg"
              {...register("image_links")}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
