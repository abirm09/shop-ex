import { useContext } from "react";
import { ExProvider } from "../Provider/ShopExProvider/ShopExProvider";

const useExProvider = () => {
  const data = useContext(ExProvider);
  return data;
};

export default useExProvider;
