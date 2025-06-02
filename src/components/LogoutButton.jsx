"use client";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded">
      Logout
    </button>
  );
}
