"use client";

import { useRouter } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import ProjectMap from "../components/ProjectMap";
import ProjectChart from "../components/ProjectChart";



export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <header className="flex justify-between items-center px-10 py-6">
        {/* Logo */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <div className="text-yellow-400 text-2xl font-bold">yello</div>
            <div className="text-sky-400 text-2xl font-bold">skye</div>
          </div>
          <span className="text-xs text-gray-400 mt-1 tracking-wide">
            Aerial · Intelligence · Delivered
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Book a meeting */}
          <button className="bg-yellow-400 text-black font-medium flex items-center px-5 py-2 rounded-full hover:bg-yellow-300">
            Book a meeting <FaPaperPlane className="ml-2" />
          </button>

          {/* Nav Links */}
          <nav className="flex items-center gap-6 text-sm font-light tracking-wide">
            <a href="#home" className="hover:text-sky-300">Home</a>
            <a href="#about" className="hover:text-sky-300">About</a>
            <a href="#products" className="hover:text-sky-300">Products</a>
            {/* Profile icon acts as login link */}
            <button onClick={() => router.push("/login")}>
              <FaUserCircle className="text-2xl hover:text-sky-300" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex">
        {/* Left Content */}
        <div className="w-1/2 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">
            Welcome to YelloSkye
          </h1>
        </div>

        {/* Right Placeholder */}
        <div className="w-1/2 flex items-center justify-center text-gray-400 text-xl">
          Your drone data. Visualized.
        </div>
      </main>
    </div>
  );
}
