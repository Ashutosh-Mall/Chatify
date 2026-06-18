import React from "react";
import { FaRocket, FaLock, FaComments, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#202C33] text-white flex flex-col">

      <header className="flex justify-between items-center px-6 py-4 border-b border-[#2A3942]">
        <h1 className="text-2xl font-bold">Chatify</h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md hover:bg-[#2A3942] transition" onClick={()=>{navigate("/login")}}>
            Login
          </button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition text-black font-medium" onClick={()=>{navigate("/signup")}}>
            Sign Up
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <h2 className="text-4xl md:text-6xl font-bold">
          Real-time Chat Made Simple ⚡
        </h2>

        <p className="text-gray-400 mt-4 max-w-xl">
          Chatify lets you connect instantly with friends and stay online
          with smooth real-time messaging.
        </p>

        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-medium rounded-md">
            Get Started
          </button>

          <button className="px-6 py-3 border border-[#2A3942] hover:bg-[#2A3942] rounded-md">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-5xl">

          <div className="bg-[#2A3942] p-5 rounded-lg hover:scale-105 transition">
            <FaComments className="text-green-400 text-2xl mb-2" />
            <h3 className="font-semibold">Instant Chat</h3>
            <p className="text-gray-400 text-sm mt-1">
              Real-time messaging without delay.
            </p>
          </div>

          <div className="bg-[#2A3942] p-5 rounded-lg hover:scale-105 transition">
            <FaRocket className="text-green-400 text-2xl mb-2" />
            <h3 className="font-semibold">Fast</h3>
            <p className="text-gray-400 text-sm mt-1">
              Lightweight and optimized performance.
            </p>
          </div>

          <div className="bg-[#2A3942] p-5 rounded-lg hover:scale-105 transition">
            <FaLock className="text-green-400 text-2xl mb-2" />
            <h3 className="font-semibold">Secure</h3>
            <p className="text-gray-400 text-sm mt-1">
              Your chats stay private and safe.
            </p>
          </div>

          <div className="bg-[#2A3942] p-5 rounded-lg hover:scale-105 transition">
            <FaUsers className="text-green-400 text-2xl mb-2" />
            <h3 className="font-semibold">Connect</h3>
            <p className="text-gray-400 text-sm mt-1">
              Chat with anyone, anywhere.
            </p>
          </div>

        </div>
      </main>

      <footer className="text-center text-gray-500 py-4 border-t border-[#2A3942]">
        © 2026 Chatify • Built for real-time communication
      </footer>

    </div>
  );
};

export default Home;