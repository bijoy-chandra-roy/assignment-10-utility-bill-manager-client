import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        const raw = err.code || err.message || "auth/unknown-error";
        setError(raw.replace("auth/", "").replaceAll("-", " "));
      });
  };

  const handleGoogleLogin = () => {
    setError("");
    signInWithGoogle()
      .then(() => {
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        const raw = err.code || err.message || "auth/unknown-error";
        setError(raw.replace("auth/", "").replaceAll("-", " "));
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-6 px-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Log in to your account</h2>
        <form onSubmit={handleLogin} className="card-body">
          <label className="label">Email</label>
          <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />

          <label className="label mt-4">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-lg z-10 bg-transparent focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="mt-2">
            <a className="link link-hover text-sm" href="https://mail.google.com/" target="_blank" rel="noreferrer">
              Forgot password?
            </a>
          </div>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Log In
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] mt-2 w-full flex items-center justify-center gap-2"
          >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Log In with Google
          </button>

          <p className="text-center text-sm font-semibold mt-5">
            Don't have an account?{" "}
            <Link className="text-secondary hover:text-green-600 hover:underline transition" to="/register">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
