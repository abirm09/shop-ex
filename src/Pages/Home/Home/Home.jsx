import { Helmet } from "react-helmet-async";
import Banner from "../Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Shop-Ex</title>
      </Helmet>
      <Banner />
    </div>
  );
};

export default Home;
