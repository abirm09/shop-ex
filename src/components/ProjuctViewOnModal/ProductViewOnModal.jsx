const ProductViewOnModal = ({ currentProduct }) => {
  return (
    <>
      <h3 className="font-bold text-lg font-inter">
        {currentProduct?.product_info?.name}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
        <img
          src={currentProduct?.product_info?.images[0]}
          alt={currentProduct?.product_info?.name}
          className="max-w-xs w-full object-cover mx-auto rounded-lg"
        />
        <div>
          <h2>Seller EMail : {currentProduct?.seller_info?.email}</h2>
        </div>
      </div>
    </>
  );
};

export default ProductViewOnModal;
