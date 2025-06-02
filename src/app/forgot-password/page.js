// "use client";

// import { useState } from "react";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../firebase";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert("Check your email for reset instructions");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleReset} className="flex flex-col gap-4 p-8 max-w-md mx-auto mt-20 border shadow">
//       <h1 className="text-2xl font-bold">Reset Password</h1>
//       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2" />
//       <button type="submit" className="bg-yellow-600 text-white p-2 rounded">Send Reset Email</button>
//     </form>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
      setError("");
    } catch (err) {
      setMessage("");
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleReset}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300"
        >
          Send Reset Link
        </button>
        <div className="mt-4 text-sm">
          <p>
            Back to login? {" "}
            <span
              className="text-sky-400 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
