import { deleteUser } from "firebase/auth";
import useExProvider from "../../hooks/useExProvider";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
const DeleteAccount = () => {
  const { user } = useExProvider();
  const { axiosSecure } = useAxiosSecure();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        deleteUser(user)
          .then(async () => {
            Swal.fire(
              "Deleted!",
              "Your Account will permanently delete.",
              "success"
            );
            try {
              const res = await axiosSecure.delete(
                `delete-user?email=${user.email}`
              );
              console.log(res);
            } catch (err) {
              console.log(err);
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please log out first and then login again.Then try to deleting your account.",
            });
          });
      }
    });
  };
  return (
    <div>
      <img
        className="rounded-full w-20 h-20"
        src={
          user.photoURL
            ? user.photoURL
            : "https://i.ibb.co/rvRhzBn/empty-user.png"
        }
        alt="User profile"
      />
      <h2 className="font-inter font-semibold mt-5">{user.displayName}</h2>
      <button className="btn btn-accent mt-3 btn-xs" onClick={handleDelete}>
        Delete Your account
      </button>
    </div>
  );
};

export default DeleteAccount;
