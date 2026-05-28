import React from "react";
import Left from "../component/Left";
import Right from "../component/Right";

const Chat = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <Left />

      {/* Chat area */}
      <Right />
    </div>
  );
};

export default Chat;