import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useExProvider from "../../hooks/useExProvider";
import { updateProfile } from "firebase/auth";
import { BaseUrl } from "../../Provider/ShopExProvider/ShopExProvider";

const Register = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [passMatchErr, setPassMatchErr] = useState("");
  const { emailPassCreation } = useExProvider();
  const [authErr, setAuthErr] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const registerUser = data => {
    emailPassCreation(data.email, data.password)
      .then(res => {
        const user = res.user;
        setRegisterLoading(false);
        console.log(data);
        const userInfo = {
          name: data.name,
          profilePic: data.profilePic,
          profileDelete: data.profilePicDelete,
          email: user.email,
        };
        console.log(userInfo);
        fetch(`${BaseUrl}/store-user`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        updateUser(user, data.name, data.profilePic)
          .then(() => {
            navigate("/");
          })
          .catch(err => console.log(err));
        reset();
      })
      .catch(err => {
        setAuthErr(err.message);
        setRegisterLoading(false);
      });
  };
  const onSubmit = data => {
    setPassMatchErr("");
    setRegisterLoading(true);
    //password match
    if (data.password !== data.re_enter_pass) {
      setPassMatchErr("Password did not math.");
      setPassMatchErr(false);
      return;
    }
    //image upload
    const formData = new FormData();
    formData.append("image", data.profile_pic[0]);
    if (data.profile_pic.length) {
      fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD
        }`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then(res => res.json())
        .then(imgInfo => {
          data.profilePic = imgInfo.data.display_url;
          data.profilePicDelete = imgInfo.data.delete_url;
          console.log(imgInfo);
          registerUser(data);
        })
        .catch(err => {
          console.log(err);
          setRegisterLoading(false);
        });
    } else {
      registerUser(data);
    }
    //register
  };
  const updateUser = (user, name, photo) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: photo || null,
    });
  };
  return (
    <div className="ex-container mt-10">
      <Helmet>
        <title>Register | Shop-Ex</title>
      </Helmet>
      <div className="max-w-xl mx-auto ring-1 ring-slate-300 bg-slate-50 p-5 rounded-lg">
        <h2 className="font-inter text-2xl font-semibold">Register now</h2>
        <form className="space-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="ex-form"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="form-validate-error">
              Name is required
            </p>
          )}
          <input
            type="email"
            className="ex-form"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="form-validate-error">
              Email is required
            </p>
          )}
          <input
            type="password"
            className="ex-form"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="form-validate-error">
              Password is required
            </p>
          )}
          <input
            type="password"
            className="ex-form"
            placeholder="Re-enter your password"
            {...register("re_enter_pass")}
          />
          {passMatchErr && (
            <p className="form-validate-error">{passMatchErr}</p>
          )}
          <h2 className="font-inter font-semibold">Profile picture</h2>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("profile_pic")}
          />
          {authErr && (
            <p className="form-validate-error">
              Error : {authErr.split("/")[1].replace(")", "")}
            </p>
          )}
          <button
            type="submit"
            className="block btn w-full ring-1 ring-slate-300"
            disabled={registerLoading}
          >
            {registerLoading ? "Loading..." : <>Register</>}
          </button>
        </form>
        <div className="font-inter text-center py-2">
          <span>Already have an account ?</span>
          <Link to="/login" className="text-cyan-700">
            {" "}
            Login
          </Link>
        </div>
        <div className="divider font-inter">OR</div>
        <span className="text-center block font-inter">Continue with </span>
      </div>
    </div>
  );
};

export default Register;
