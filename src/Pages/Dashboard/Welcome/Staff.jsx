import { FaCheckCircle } from "react-icons/fa";
import DashboardManageLink from "../../../components/DashboardManageLink/DashboardManageLink";

const Staff = () => {
  const checkCircle = <FaCheckCircle className="dashboard-links-icon" />;

  return (
    <>
      <DashboardManageLink
        icon={checkCircle}
        title="Initial check products"
        to="/dashboard/initial-check-products"
      />
    </>
  );
};

export default Staff;
