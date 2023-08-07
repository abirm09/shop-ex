import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryQuickLinks = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    fetch("/category-data.json")
      .then(data => data.json())
      .then(data => setCategoryData(data));
  }, []);
  return (
    <>
      <div className="ex-container mt-20 overflow-x-auto">
        <div className="flex gap-4 justify-center flex-wrap">
          {categoryData.map(item => (
            <Link
              to=""
              key={item.id}
              className="flex gap-2 bg-base-200 py-2 px-4 rounded-full active:scale-110 hover:bg-base-300 transition-all select-none cursor-pointer"
            >
              <img src={item.image} alt={item.name} className="w-5" />
              <h2 className="font-inter font-bold">{item.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryQuickLinks;
