import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Pages/Loading/Loading";
import useExProvider from "../../hooks/useExProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useExProvider();
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoutes;
