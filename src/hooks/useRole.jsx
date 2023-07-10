import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import useExProvider from "./useExProvider";

const useRole = () => {
  const { user, loading } = useExProvider();
  const { axiosSecure } = useAxiosSecure();
  const { data: role = "customer", isLoading: isRoleLoading } = useQuery({
    queryKey: ["role"],
    enabled: !loading,
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/role?email=${user?.email}`);
        return res.data.role;
      }
      return "customer";
    },
  });
  return { role, isRoleLoading };
};

export default useRole;
