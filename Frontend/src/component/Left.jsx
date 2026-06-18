import React from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { FaUserCircle } from "react-icons/fa";

const Left = () => {
  const { allUsers, selectedUser, setSelectedUser } = useChat();
  const { authUser } = useAuth();
  const { onlineUsers } = useSocket();

  return (
    <div className="w-full h-full bg-[#202C33] text-white overflow-y-auto">
      <div className="sticky top-0 bg-[#202C33] z-10 border-b border-gray-700">
        <div className="p-5">
          <h1 className="text-2xl font-bold">Chatify</h1>
          <p className="text-sm text-gray-400 mt-1">
            {authUser?.userName}
          </p>
        </div>
      </div>

      <div>
        {allUsers?.map((user) => {
          const isOnline = onlineUsers?.includes(user._id);

          return (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-[#2A3942]
                ${
                  selectedUser?._id === user._id
                    ? "bg-[#2A3942]"
                    : "hover:bg-[#2A3942]"
                }`}
            >
              <div className="relative">
                <FaUserCircle size={48} className="text-gray-300" />

                <span
                  className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-[#202C33]
                    ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
                />
              </div>

              <div className="flex-1">
                <h2 className="font-medium text-white">
                  {user.userName}
                </h2>

                <p className="text-sm text-gray-400">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Left;