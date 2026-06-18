import React, {useState} from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {login, loading, message} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(formData);
  };

  return (
    <div className="min-h-screen bg-[#111B21] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#202C33] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-3xl">
            💬
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">Welcome Back</h1>

          <p className="text-gray-400 mt-2 text-sm">
            Login to continue chatting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#2A3942] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#25D366] transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#2A3942] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#25D366] transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-4 rounded-xl transition-all disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          {message && (
            <p className="text-center text-red-400 text-sm">{message}</p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?
            <span className="text-[#25D366] ml-1 cursor-pointer font-medium" onClick={()=>navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
