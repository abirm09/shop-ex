import { Link, useLoaderData } from "react-router-dom";

const Products = () => {
  const randomProducts = useLoaderData();
  return (
    <>
      <div className="ex-container mt-20" id="products">
        <div>
          <h2 className="section-title">Features Products</h2>
          <p className="section-sub-tittle">Chose your favorite products now</p>
          <div className="flex flex-wrap gap-10 justify-center mt-20">
            {randomProducts.map(item => (
              <div key={item._id} className="w-60">
                <figure className="inline-block rounded-lg overflow-hidden ring-1 ring-slate-400 p-3">
                  <img
                    className="w-60 h-60 object-cove"
                    src={item.product_info.images[0]}
                    alt={item.product_info.name}
                  />
                </figure>
                <div className="font-inter font-semibold space-y-1 mt-2">
                  <p className="text-slate-400 text-sm">
                    {item.product_info.sub_category}
                  </p>
                  <Link
                    to={`product-details/${item._id}`}
                    className="text-lg hover:text-orange-600 transition-all"
                  >
                    {item.product_info.name.length > 18 ? (
                      <>{item.product_info.name.slice(0, 18)}...</>
                    ) : (
                      item.product_info.name.slice(0, 18)
                    )}
                  </Link>
                  <p className="text-slate-400">${item.product_info.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
