import { FaListAlt } from "react-icons/fa";
import DashboardManageLink from "../../../components/DashboardManageLink/DashboardManageLink";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const Seller = () => {
  const list = <FaListAlt className="dashboard-links-icon"/>;
  const addProduct=<BiSolidMessageSquareAdd className="dashboard-links-icon"/>
  return (
    <>
        <DashboardManageLink title="Your added products." icon={list} to="/dashboard/add-new-product" />
        <DashboardManageLink title="Add new product" icon={addProduct} to="/dashboard/add-new-product"/>
    </>
  );
};

export default Seller;
