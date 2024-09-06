import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData)
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    // console.log(image)
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");
      setImagePercent(Math.round(progress));
    },
    (error) => {
      setImageError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, profilePicture: downloadURL });
      });
    }
  )
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h3 className="text-3xl text-center font-semibold my-7">Profile</h3>
      <form action="" className="flex flex-col gap-4">
        {/* Firebase Storage Rules
        allow read; 
        allow write: if
        request.resource.size < 2 * 1024 * 1024 &&
        request.resource.contentType.matches('image/.*') */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2 mb-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center mb-2">{imageError?(<span className="text-red-700">Error when uploading image (File size must be less than 2 MB)</span>): imagePercent > 0 && imagePercent < 100 ? (<span className="text-slate-700">{`Uploading Image : ${imagePercent} %`}</span>): imagePercent === 100 ? (<span className="text-green-700">Image Uploaded Successfully</span>):''}</p>
        <input
          type="text"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Username"
          id="username"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Email"
          id="email"
        />
        <input
          type="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Password"
          id="password"
        />
        <button className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Logout</span>
      </div>
    </div>
  );
}
