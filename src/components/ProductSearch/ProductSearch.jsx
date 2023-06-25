import { BsArrowRightShort } from "react-icons/bs";
const ProductSearch = () => {
  const handleSearch = event => {
    event.preventDefault();
    console.log(event.target.search.value);
  };
  return (
    <form
      className="ring-1 ring-slate-300 rounded-md max-w-[270px] w-full transition-all bg-white flex justify-between items-center"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search here"
        className="outline-none w-[90%] py-1 pl-2 md:pl-3 rounded-md"
        name="search"
      />
      <button className="cursor-pointer w-[10%] py-2">
        <BsArrowRightShort className="w-6 h-6 transition-all hover:translate-x-1" />
      </button>
    </form>
  );
};

export default ProductSearch;
