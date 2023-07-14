import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <BsArrowLeftCircle color="#64748b" className="w-8 h-8" />
    </button>
  );
};

export default BackButton;
