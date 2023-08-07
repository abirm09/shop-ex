import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AiFillStar,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { IoBagAdd } from "react-icons/io5";
import { useLoaderData } from "react-router-dom";
import useRole from "../../../hooks/useRole";

const SingleProductDetails = () => {
  const { role } = useRole();
  console.log(role);
  const productInfo = useLoaderData();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  console.log(productInfo);
  const handleSizeSelection = size => {
    setSelectedSize(size);
  };
  console.log(selectedSize);
  const handleQuantity = operator => {
    if (operator === "+" && quantity < 11) {
      setQuantity(quantity + 1);
    } else if (operator === "-" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <Helmet>
        <title>{productInfo?.product_info.name} | Shop-Ex</title>
      </Helmet>
      <div className="ex-container">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center mt-20 gap-10">
          <div>
            <div className="ring-1 ring-slate-300 p-5 rounded-lg">
              <img
                src={productInfo.product_info.images[0]}
                alt={productInfo.product_info.name}
                className="max-w-[280px] w-full mx-auto"
              />
            </div>
          </div>
          <div>
            <h2 className="font-inter font-bold text-xl">
              {productInfo.product_info.name}
            </h2>
            <div className="mt-4 flex gap-5 items-center">
              <h2 className="text-green-500 ring-2 ring-green-500 inline-block py-1 px-4 rounded-md font-bold">
                $ {productInfo.product_info.price}
              </h2>
              <span className="w-[2px] h-10 bg-slate-300"></span>
              <span className="flex items-center gap-1 font-inter font-bold">
                <AiFillStar className="w-8 h-8 text-yellow-400" />{" "}
                {productInfo.product_info.ratings}
              </span>
            </div>
            <div className="font-inter font-semibold mt-6">
              <div className="flex justify-between">
                <span>Size : {selectedSize}</span>
                <span className="text-blue-500">Available sizes</span>
              </div>
              <div className="flex gap-3 justify-center mt-5">
                {productInfo.product_info.sizes.map((item, index) => (
                  <span
                    key={index}
                    className={`ring-1 ring-slate-400 py-1 px-4 rounded-md select-none cursor-pointer ${
                      selectedSize === item ? "bg-sky-400 text-white" : ""
                    }`}
                    onClick={() => handleSizeSelection(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex justify-evenly gap-5">
                <div className="bg-slate-50 inline-block px-4 py-1 rounded-full">
                  <span className="flex items-center gap-3 select-none ">
                    <button
                      onClick={() => handleQuantity("-")}
                      disabled={quantity <= 1 ? true : false}
                    >
                      <AiOutlineMinusCircle
                        className={`w-7 h-7 ${
                          quantity <= 1 ? "text-slate-400" : ""
                        }`}
                      />
                    </button>
                    <span className="text-2xl"> {quantity}</span>
                    <button
                      disabled={quantity >= 10 ? true : false}
                      onClick={() => handleQuantity("+")}
                    >
                      <AiOutlinePlusCircle
                        className={`w-7 h-7 ${
                          quantity >= 10 ? "text-slate-400" : ""
                        }`}
                      />
                    </button>
                  </span>
                </div>
                <div className="flex-1 flex justify-center">
                  <button
                    disabled={role !== "customer" ? true : false}
                    className={`flex gap-4 items-center justify-center  w-full rounded-full text-white transition-all ${
                      role !== "customer"
                        ? "btn"
                        : "bg-slate-800 active:scale-95"
                    }`}
                  >
                    <IoBagAdd className="w-5 h-5 text-white" /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl text-black font-inter font-bold">
              Product Details
            </h2>
            <p className="mt-4 font-inter text-sm">
              {productInfo.product_info.productDetails}
            </p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl text-black font-inter font-bold">
              Reviews
            </h2>
            {}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductDetails;
