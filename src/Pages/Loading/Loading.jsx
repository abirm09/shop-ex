import Lottie from "lottie-react";
import loadingAnim from "../../assets/loading/loading-anim-2.json";
import logo from "/shop-ex-logo.svg";
const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col fixed left-0 top-0">
      <img src={logo} className="w-20 md:w-40" alt="Logo" />
      <Lottie
        className="w-10 h-10 md:w-20 md:h-20"
        animationData={loadingAnim}
        loop={true}
      />
    </div>
  );
};

export default Loading;
