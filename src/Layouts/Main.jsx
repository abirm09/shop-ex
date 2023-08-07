import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";
import useExProvider from "../hooks/useExProvider";
import Loading from "../Pages/Loading/Loading";
import useRole from "../hooks/useRole";

const Main = () => {
  const { loading } = useExProvider();
  const navigation = useNavigation();
  const { isRoleLoading } = useRole();
  if (loading || navigation.state == "loading" || isRoleLoading) {
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
