import axios from "axios";
import { BaseUrl } from "../Provider/ShopExProvider/ShopExProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useExProvider from "./useExProvider";
const axiosSecure = axios.create({ baseURL: BaseUrl });
export const useAxiosSecure = () => {
  const { logOutUser } = useExProvider();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.request.use(config => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, logOutUser]);
};
