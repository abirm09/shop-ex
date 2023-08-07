import { Helmet } from "react-helmet-async";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import useExProvider from "../../../../hooks/useExProvider";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import BackButton from "../../../../components/BackButton/BackButton";

const AddAStaff = () => {
  const { user } = useExProvider();
  const { axiosSecure } = useAxiosSecure();
  const [searchedUser, setSearchedUser] = useState(null);
  const handleSearchStaff = async event => {
    event.preventDefault();
    const email = event.target.email.value;
    if (!email) {
      return setSearchedUser(null);
    }
    try {
      const res = await axiosSecure.get(
        `get-new-staff-info?email=${user.email}&&staffEmail=${email}`
      );
      setSearchedUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewStaff = async () => {
    try {
      const res = await axiosSecure.post(
        `make-new-staff?email=${user.email}&&staffEmail=${searchedUser.email}`
      );
      if (res.data.modifiedCount) {
        toast.success("Approved as a staff.");
        setSearchedUser(null);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Add new staff | Shop-Ex</title>
      </Helmet>
      <BackButton />
      <div className="mt-5">
        <form onSubmit={handleSearchStaff}>
          <input
            type="email"
            className="ex-form max-w-xl"
            placeholder="Enter new staff email"
            name="email"
          />
          <input type="submit" className="btn ml-3" value="Search" />
        </form>
        {searchedUser ? (
          <div className="mt-10 font-inter font-semibold  w-full bg-slate-50 p-5 rounded-lg shadow-md">
            {searchedUser.status ? (
              <div className="flex gap-3 justify-evenly items-center">
                <h2>{searchedUser.name}</h2>
                <img
                  src={searchedUser.profilePic}
                  alt={searchedUser.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <h2>{searchedUser.email}</h2>
                <button
                  className="ex-btn bg-green-600 text-white"
                  onClick={handleNewStaff}
                >
                  Make staff
                </button>
              </div>
            ) : (
              <h2 className="text-center text-red-700 font-bold">
                Please recheck the email.
              </h2>
            )}
          </div>
        ) : (
          <h2 className="text-center mt-10 font-inter font-bold">
            Search a customer to make the new staff.
          </h2>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AddAStaff;
