import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border rounded"
        />
        <button
          type="submit"
          className="p-3 bg-primary text-white font-semibold rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don't have an account? <a href="/register" className="text-primary">Register</a>
      </p>
    </div>
  );
};

export default LoginPage;
