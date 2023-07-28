import { FaExclamationTriangle, FaListAlt } from "react-icons/fa";
import DashboardManageLink from "../../../components/DashboardManageLink/DashboardManageLink";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const Seller = () => {
  const list = <FaListAlt className="dashboard-links-icon" />;
  const addProduct = (
    <BiSolidMessageSquareAdd className="dashboard-links-icon" />
  );
  const exclamation = (
    <FaExclamationTriangle className="dashboard-links-icon" />
  );
  return (
    <>
      <DashboardManageLink
        title="Your added products."
        icon={list}
        to="/dashboard/added-products"
      />
      <DashboardManageLink
        title="Add new product"
        icon={addProduct}
        to="/dashboard/add-new-product"
      />
      <DashboardManageLink
        title="Rejected products"
        icon={exclamation}
        to="/dashboard/rejected-products"
      />
    </>
  );
};

export default Seller;
