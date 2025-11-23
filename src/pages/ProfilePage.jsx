import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updatePassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfilePage = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "UtilityHub - Profile";

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const { user, updateUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess("");
    try {
      await updateUser({ displayName, photoURL });
      setSuccess("Profile information updated successfully.");

      if (password) {
        if (error) return;
        await updatePassword(user, password);
        setSuccess("Password updated successfully.");
        setPassword("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 dark:bg-base-300 w-full max-w-md shadow-2xl">
        <form onSubmit={handleUpdate} className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">My Profile</h2>

          <div className="flex flex-col items-center mb-4">
            <div className="avatar mb-4">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Avatar"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Profile Picture URL</span>
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full text-base-content/50 cursor-not-allowed"
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  if (!/[A-Z]/.test(val))
                    setError("Password must contain at least one uppercase letter");
                  else if (!/[a-z]/.test(val))
                    setError("Password must contain at least one lowercase letter");
                  else if (val.length < 6)
                    setError("Password must be at least 6 characters long");
                  else setError("");
                }}
                onBlur={(e) => {
                  if (!e.target.value) setError("");
                }}
                placeholder="Enter new password"
                className="input input-bordered w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-lg z-10 btn btn-sm btn-circle btn-ghost text-base-content/70"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-error text-xs mt-2">{error}</p>}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!!error}
            >
              Update Profile
            </button>
          </div>

          {success && <p className="text-success text-sm text-center mt-4 font-semibold">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;