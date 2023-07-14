import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";
import { Navigate } from "react-router-dom";
import useExProvider from "../../hooks/useExProvider";
import { useRef } from "react";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Application from "./Application";

const BecomeASeller = () => {
  const { user } = useExProvider();
  const { role } = useRole();
  const modalClose = useRef();
  const { axiosSecure } = useAxiosSecure();
  const {
    data: applicationStatus = null,
    isLoading: applicationLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellerStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `seller-application-status?email=${user.email}`
      );
      if (res.data.sellerRequest === "denied") {
        return res.data;
      }
      return res.data.sellerRequest;
    },
  });
  if (!role === "customer") {
    return <Navigate to="/"></Navigate>;
  }
  if (applicationLoading) {
    return <h2>Lading...</h2>;
  }
  const handleBecomingASeller = async () => {
    console.log(user.email);
    try {
      const res = await axiosSecure.post(`become-a-seller?email=${user.email}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Request sended successfully");
        modalClose.current.click();
        refetch();
      }
    } catch (err) {
      toast.error("Something went wrong. try again.");
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Apply for becoming a seller | Shop-Ex</title>
      </Helmet>
      {applicationStatus === null ? (
        <Application
          handleBecomingASeller={handleBecomingASeller}
          user={user}
          modalClose={modalClose}
          body="Apply"
        />
      ) : applicationStatus === "pending" ? (
        <>
          <h2 className="font-inter text-green-800 font-bold text-center">
            Your application is pending. Once our admin approve you, you will
            notify.
            <p>Thank you.</p>
          </h2>
        </>
      ) : applicationStatus.sellerRequest === "denied" ? (
        <>
          <h2>
            Your application is{" "}
            <span className="form-validate-error">denied</span>.
          </h2>
          <p className="form-validate-error mb-5">
            Details: {applicationStatus.deniedReason}
          </p>
          <Application
            handleBecomingASeller={handleBecomingASeller}
            user={user}
            modalClose={modalClose}
            body="Apply again"
          />
        </>
      ) : (
        <h2 className="form-validate-error">Something went wrong.</h2>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default BecomeASeller;
