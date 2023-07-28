import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <BsArrowLeftCircle className="w-8 h-8 text-slate-500 hover:text-slate-700 transition-all" />
    </button>
  );
};

export default BackButton;
