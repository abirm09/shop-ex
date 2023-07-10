import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import NotFound from "../../assets/404/404-page-not-found.json";
const Error404 = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full">
        <div className="w-full flex justify-center">
          <Lottie className="w-96 h-96" animationData={NotFound} loop={true} />
        </div>
        <div className="flex justify-center">
          <Link to="/" className="btn btn-accent text-center">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
