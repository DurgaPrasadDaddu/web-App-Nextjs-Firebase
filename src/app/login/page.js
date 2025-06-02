"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/projects");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300"
        >
          Login
        </button>
        <div className="mt-4 text-sm">
          <p>
            Don’t have an account?{" "}
            <span
              className="text-sky-400 cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Register
            </span>
          </p>
          <p className="mt-1">
            <span
              className="text-sky-400 cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
