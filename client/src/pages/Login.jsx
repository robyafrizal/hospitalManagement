import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

export default function Login() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // setError(false)
      dispatch(loginStart())
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // setLoading(false);
      if (data.success === false) {
        // setError(true);
        dispatch(loginFailure(data))
        return;
      }
      dispatch(loginSuccess(data))
      navigate('/') //Direct to homepage
    } catch (error) {
      // setError(true);
      dispatch(loginFailure(error))
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Login</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Oauth/>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Don't have an account?</p>
        <Link to="/register">
          <span className="text-blue-500">Register</span>
        </Link>
      </div>
      <p className="text-red-700 mt-3">{error ? error.message || "Something went wrong" : ''}</p>
    </div>
  );
}
