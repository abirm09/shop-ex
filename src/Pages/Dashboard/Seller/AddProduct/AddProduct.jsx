import { Helmet } from "react-helmet-async";
import BackButton from "../../../../components/BackButton/BackButton";
import { useForm } from "react-hook-form";
import useExProvider from "../../../../hooks/useExProvider";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Loading/Loading";
import CreatableSelect from "react-select/creatable";
import { Toaster, toast } from "react-hot-toast";

const AddProduct = () => {
  const { user } = useExProvider();
  const [sizes, setSizes] = useState([]);
  const { axiosSecure } = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryErr, setSubCategoryErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { data: allCategories = [], isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`get-categories?email=${user.email}`);
      return res.data;
    },
  });
  if (categoryLoading) {
    return <Loading />;
  }
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
  const getCategoryValue = value => {
    setSelectedCategory(value?.value || null);
  };
  const getSubCategoryValue = value => {
    setSubCategories(value?.value || null);
  };
  const onSubmit = async data => {
    setCategoryError("");
    setSubCategoryErr("");
    if (!selectedCategory) {
      return setCategoryError("Please select category.");
    }
    if (!subCategories) {
      return setSubCategoryErr("Please select subcategory.");
    }
    data.category = selectedCategory || null;
    data.sub_category = subCategories || null;
    sizes.sort((a, b) => a.position - b.position);
    data.sizes = sizes.map(item => item.name);
    if (!data.sizes.length) {
      data.sizes = null;
    }
    data["seller_name"] = user.displayName;
    data.email = user.email;
    data.product_price = parseFloat(data.product_price);
    data.available_quantity = parseFloat(data.available_quantity);
    try {
      const res = await axiosSecure.post(
        `add-new-product?email=${user.email}`,
        data
      );
      if (res.data.acknowledged) {
        reset();
        toast.success("Product added successfully");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <Helmet>
        <title>Add new product | Shop-Ex</title>
      </Helmet>
      <div className="ex-container">
        <BackButton />
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
              {...register("product_name", { required: true })}
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
              {...register("product_price", { required: true })}
            />
            {errors.product_price?.type === "required" && (
              <p role="alert" className="form-validate-error">
                Product price is must required.
              </p>
            )}
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
              {...register("ratings", { required: true })}
            />
            {errors.product_name?.type === "required" && (
              <p role="alert" className="form-validate-error">
                Ratings is required.
              </p>
            )}
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
            <label htmlFor="image_links" className="ex-label">
              Image link
            </label>
            <input
              className="ex-form"
              type="text"
              name="image_links"
              placeholder="http://example.com/image.jpg"
              {...register("image_links", { required: true })}
            />
            {errors.image_links?.type === "required" && (
              <p role="alert" className="form-validate-error">
                Product name is required.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="category" className="ex-label">
              Category
            </label>
            <CreatableSelect
              isClearable
              onChange={getCategoryValue}
              options={allCategories.category}
            />
            {categoryError && (
              <p className="form-validate-error">{categoryError}</p>
            )}
          </div>
          <div>
            <label htmlFor="category" className="ex-label">
              Sub category
            </label>
            <CreatableSelect
              isClearable
              onChange={getSubCategoryValue}
              options={allCategories.sub_categories}
            />
            {subCategoryErr && (
              <p className="form-validate-error">{subCategoryErr}</p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="category" className="ex-label">
              Product description
            </label>
            <textarea
              className="ex-form"
              placeholder="Write product description here."
              {...register("product_description", { required: true })}
            ></textarea>
            {errors.product_description?.type === "required" && (
              <p role="alert" className="form-validate-error">
                Product description is required.
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <button type="submit" className="ex-btn-primary">
              Add product
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AddProduct;
