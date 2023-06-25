import { NavLink } from "react-router-dom";

const ActiveLinks = ({ to, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "text-red-500" : "") + " "}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default ActiveLinks;
