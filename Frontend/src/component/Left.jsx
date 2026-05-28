import React from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Left = () => {
  const { allUsers, setSelectedUser, selectedUser } = useChat();
  const { onlineUsers } = useAuth();

  return (
    <div className="w-1/3 bg-white border-r overflow-y-auto">
      
      {/* Header */}
      <div className="p-4 border-b font-bold text-lg">
        Chats
      </div>

      {/* Users */}
      {allUsers.map((user) => {
        const isOnline = onlineUsers.includes(user._id);

        return (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
              selectedUser?._id === user._id ? "bg-gray-200" : ""
            }`}
          >
            <FaUserCircle size={30} />

            <div>
              <p className="font-medium">{user.userName}</p>
              <p className="text-xs text-gray-500">
                {isOnline ? "🟢 Online" : "⚪ Offline"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Left;