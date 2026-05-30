import {useState, useContext, useEffect, createContext} from "react";

import axios from "axios";
import {io} from "socket.io-client";

const backendURL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getUser = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${backendURL}/api/auth/get/me`, {
        withCredentials: true,
      });

      setAuthUser(response.data.user);
      setIsLogin(true);
      console.log(response.data.user._id);

      setMessage(response.data.message);
    } catch (error) {
      setAuthUser(null);
      setIsLogin(false);

      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `${backendURL}/api/auth/register`,
        userData,
        {
          withCredentials: true,
        },
      );

      setAuthUser(response.data.user);
      setIsLogin(true);
      console.log(response.data.user._id);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `${backendURL}/api/auth/login`,
        userData,
        {
          withCredentials: true,
        },
      );

      setAuthUser(response.data.user);
      setIsLogin(true);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${backendURL}/api/auth/logout`, {
        withCredentials: true,
      });

      setAuthUser(null);
      setIsLogin(false);

      setMessage(response.data.message);

      socket?.disconnect();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,

        isLogin,
        setIsLogin,

        loading,
        setLoading,

        message,
        setMessage,

        getUser,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
