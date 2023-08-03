import DashboardManageLink from "../../../components/DashboardManageLink/DashboardManageLink";
import { BsFillClipboardCheckFill } from "react-icons/bs";

const Admin = () => {
  const checked = <BsFillClipboardCheckFill />;

  return (
    <>
      <DashboardManageLink
        title="Approve product"
        icon={checked}
        to="/dashboard/approve-product"
      />
    </>
  );
};

export default Admin;
