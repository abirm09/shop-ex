import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import CategoryQuickLinks from "../CategoryQuickLinks";
import Products from "../Products";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Shop-Ex</title>
      </Helmet>
      <Banner />
      <CategoryQuickLinks />
      <Products />
    </div>
  );
};

export default Home;
