import { FaStore, FaUserTie } from "react-icons/fa";
import DashboardManageLink from "../../../components/DashboardManageLink/DashboardManageLink";
import { BsFillClipboardCheckFill } from "react-icons/bs";

const Admin = () => {
  const checked = <BsFillClipboardCheckFill className="w-5 h-5" />;
  const storeIcon = <FaStore className="w-5 h-5" />;
  const userTie = <FaUserTie className="w-5 h-5" />;
  return (
    <>
      <DashboardManageLink
        title="Approve product"
        icon={checked}
        to="/dashboard/approve-product"
      />
      <DashboardManageLink
        title="Approve seller request"
        icon={storeIcon}
        to="/dashboard/approve-seller-req"
      />
      <DashboardManageLink
        title="Add a staff"
        icon={userTie}
        to="/dashboard/add-a-staff"
      />
    </>
  );
};

export default Admin;
