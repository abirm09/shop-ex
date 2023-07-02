import { NavLink } from "react-router-dom";

const ActiveLinks = ({ to, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          (isActive ? "text-cyan-700" : "") + " active-link"
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default ActiveLinks;
