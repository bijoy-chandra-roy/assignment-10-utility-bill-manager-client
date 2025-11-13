import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updatePassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfilePage = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 mb-3">
              <img
                src={
                  photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Profile image URL"
              className="p-2 border rounded w-full"
            />
          </div>

          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Full Name"
            className="p-2 border rounded w-full"
          />

          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="p-2 border rounded bg-gray-100 cursor-not-allowed w-full"
          />

          <div>
            <label className="block text-sm mb-1">New Password</label>
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
                className="p-2 border rounded w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="p-3 bg-primary text-white font-semibold rounded hover:bg-gray-800 transition"
            disabled={error ? true : false}
          >
            Update Profile
          </button>

          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
