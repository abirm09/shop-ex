import { Link } from "react-router-dom";

const DashboardManageLink = ({ icon, title,to }) => {
  return (
    <Link to={to} className="dashboard-links-style hover:scale-105 transition-all">
    <span className="flex flex-col justify-center items-center">
      <span>{icon}</span>
      <span className="font-inter font-bold mt-2">{title}</span>
    </span>
    </Link>
  );
};

export default DashboardManageLink;
