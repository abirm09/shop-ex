import { AiFillCamera } from "react-icons/ai";
import useExProvider from "../../hooks/useExProvider";
import { useRef, useState } from "react";
import { updateProfile } from "firebase/auth";
import Lottie from "lottie-react";
import loadingAnim from "../../assets/loading/loading-anim-2.json";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Toaster, toast } from "react-hot-toast";

const Setting = () => {
  const { user } = useExProvider();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgUploadLoading, setImgUploadLoading] = useState(false);
  const { axiosSecure } = useAxiosSecure();

  const myRef = useRef();
  const handleImageSelect = event => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };
  const handleUpdate = event => {
    event.preventDefault();
    setImgUploadLoading(true);
    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);
    console.log(formData);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then(res => res.json())
      .then(imageInfo => {
        setImgUploadLoading(false);
        updateProfile(user, {
          photoURL: imageInfo.data.display_url,
        })
          .then(async () => {
            setImgUploadLoading(false);
            toast.success("Profile picture updated");
            myRef.current.click();
            const updateInfo = {
              profilePic: imageInfo.data.display_url,
              profileDelete: imageInfo.data.delete_url,
            };
            try {
              const res = await axiosSecure.post(
                `update-user-profile-pic?email=${user.email}`,
                updateInfo
              );
              console.log(res);
              setTimeout(() => {
                window.location.reload();
              }, 10);
            } catch (err) {
              console.log(err);
            }
          })
          .catch(err => {
            console.log(err);
            toast.error("Try again");
          });
      })
      .catch(err => {
        console.log(err);
        setImgUploadLoading(false);
      });
  };
  return (
    <>
      <div>
        <button
          className={`w-16 h-16 rounded-full ring-1 ring-slate-300 bg-cover relative overflow-hidden group active:scale-95`}
          title="Change profile pic"
        >
          <img
            src={user?.photoURL}
            alt="User photo"
            className="w-16 h-16 rounded-full absolute top-0 left-0 z-0"
          />
          <div className="w-full h-2/4 bg-slate-200/60 absolute -bottom-2/4 group-hover:bottom-0 transition-all flex justify-center items-center z-10">
            <AiFillCamera />
          </div>
          <label
            htmlFor="my_modal_6"
            className="w-full h-full absolute z-20 left-0 top-0 cursor-pointer"
          ></label>
        </button>
        <h2 className="mt-3 font-inter font-bold">{user.displayName}</h2>
      </div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative overflow-hidden">
          {imgUploadLoading ? (
            <div className="absolute w-full h-full bg-slate-400/30 top-0 left-0 flex justify-center items-center flex-col">
              <Lottie
                className="w-10 h-10 md:w-28 md:h-28"
                animationData={loadingAnim}
                loop={true}
              />
              <h2 className="font-bold font-inter">Image is uploading</h2>
            </div>
          ) : (
            ""
          )}
          <h3 className="font-bold text-lg">Change your profile picture.</h3>
          <div className="mt-5">
            <p className="font-semibold">Set image ratio 1:1</p>
            <form onSubmit={handleUpdate}>
              <input
                type="file"
                onChange={handleImageSelect}
                className="file-input w-full max-w-xs mt-3"
                name="image"
              />
              <button className="btn btn-xs ring-1 ring-slate-300 block mt-5">
                Update
              </button>
            </form>
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Selected image"
                  className="max-w-[150px] w-full aspect-square mt-5 mx-auto"
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn btn-xs btn-error ring-1 ring-rose-700"
              ref={myRef}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Setting;
