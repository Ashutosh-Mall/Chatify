import {createContext, useContext, useState, useEffect} from "react";

import axios from "axios";
import {useAuth} from "./AuthContext";

const backendURL = import.meta.env.VITE_API_URL;

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({children}) => {
  const {authUser, socket} = useAuth();

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendURL}/api/chat/users`, {
        withCredentials: true,
      });

      setAllUsers(response.data.users);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async (receiverId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendURL}/api/chat/messages/${receiverId}`,
        {
          withCredentials: true,
        },
      );
      setMessages(response.data.messages);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (receiverId, text) => {
    try {
      await axios.post(
        `${backendURL}/api/chat/send/${receiverId}`,
        {text},
        {withCredentials: true},
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (
        selectedUser &&
        (newMessage.senderId.toString() === selectedUser._id.toString() ||
          newMessage.receiverId.toString() === selectedUser._id.toString())
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedUser]);

  useEffect(() => {
    if (authUser) {
      getAllUsers();
    }
  }, [authUser]);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  return (
    <ChatContext.Provider
      value={{
        allUsers,
        setAllUsers,

        selectedUser,
        setSelectedUser,

        messages,
        setMessages,

        loading,
        message,

        getAllUsers,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
