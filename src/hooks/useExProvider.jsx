import { useContext } from "react";
import { ExContext } from "../Provider/ShopExProvider/ShopExProvider";

const useExProvider = () => {
  const data = useContext(ExContext);
  return data;
};

export default useExProvider;
