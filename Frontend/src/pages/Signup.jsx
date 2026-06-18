import React, {useState} from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {signUp, message} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signUp(formData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#111B21] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#202C33] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-3xl">
            💬
          </div>
          <h1 className="text-white text-3xl font-bold mt-4">Chatify</h1>
          <p className="text-gray-400 text-sm mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full bg-[#2A3942] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#25D366]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#2A3942] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#25D366]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#2A3942] text-white p-4 rounded-xl outline-none border border-transparent focus:border-[#25D366]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-4 rounded-xl transition-all"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {message && (
            <p className="text-center text-red-400 text-sm">{message}</p>
          )}
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?
          <span className="text-[#25D366] cursor-pointer ml-1" onClick={()=> navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
