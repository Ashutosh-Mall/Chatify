import React from "react";
import Left from "../component/Left";
import Right from "../component/Right";
import { useChat } from "../context/ChatContext";

const Chat = () => {
  const { selectedUser } = useChat();

  return (
    <div className="h-screen bg-[#111B21]">
      <div className="flex h-full">
        
        {/* Sidebar */}
        <div
          className={`
            ${selectedUser ? "hidden md:block" : "block"}
            w-full md:w-[350px]
          `}
        >
          <Left />
        </div>

        {/* Chat Area */}
        <div
          className={`
            ${selectedUser ? "flex" : "hidden md:flex"}
            flex-1
          `}
        >
          <Right />
        </div>

      </div>
    </div>
  );
};

export default Chat;