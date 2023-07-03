import { Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";
import useExProvider from "../hooks/useExProvider";
import Loading from "../Pages/Loading/Loading";

const Main = () => {
  const { loading } = useExProvider();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Main;
