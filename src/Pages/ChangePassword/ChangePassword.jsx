import { useState } from "react";
import useExProvider from "../../hooks/useExProvider";
import { updatePassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

const ChangePassword = () => {
  const [passErr, setPassErr] = useState("");
  const { user } = useExProvider();
  const handlePassUpdate = event => {
    setPassErr("");
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const RePassword = form.rePass.value;
    if (password !== RePassword) {
      return setPassErr("Password did not match.");
    }
    updatePassword(user, password)
      .then(() => {
        toast.success("Password changed successfully");
        form.reset();
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <div>
        <h2 className="my-3 font-inter">Change your password</h2>
        <form className="space-y-5 max-w-xl" onSubmit={handlePassUpdate}>
          <input
            type="password"
            className="ex-form"
            placeholder="Enter new password"
            name="password"
          />
          <input
            type="password"
            className="ex-form"
            placeholder="Re-enter new password"
            name="rePass"
          />
          {passErr ? (
            <h2 className="text-red-500 font-inter font-semibold">{passErr}</h2>
          ) : (
            <></>
          )}
          <button type="submit" className="btn btn-accent">
            Change password
          </button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ChangePassword;
