import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const googleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result)
      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      // console.log(data)
      dispatch(loginSuccess(data));
      navigate('/') //Direct to homepage
    } catch (error) {
      // console.log("Could not login with google", error);
      dispatch(loginFailure(error))
    }
  };
  return (
    <button
      type="button"
      onClick={googleClick}
      className="bg-red-700 text-white uppercase p-3 rounded-lg hover:opacity-85"
    >
      Continue With Google
    </button>
  );
}
