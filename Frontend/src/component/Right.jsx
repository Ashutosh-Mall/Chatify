import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { FaPaperPlane } from "react-icons/fa";

const Right = () => {
  const { messages, selectedUser, sendMessage } = useChat();
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!selectedUser) return;

    await sendMessage(selectedUser._id, text);
    setText("");
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-gray-100">

      {/* Header */}
      <div className="p-4 border-b bg-white font-semibold">
        {selectedUser ? selectedUser.userName : "Select a chat"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded-lg max-w-xs break-words ${
              msg.senderId === selectedUser?._id
                ? "bg-white self-start text-black"
                : "bg-blue-500 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* scroll anchor */}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2 bg-white">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!selectedUser}
          className="flex-1 border rounded px-3 py-2 outline-none"
          placeholder={
            selectedUser ? "Type a message..." : "Select a user first"
          }
        />

        <button
          onClick={handleSend}
          disabled={!selectedUser}
          className="bg-blue-500 text-white px-4 rounded flex items-center gap-2 disabled:opacity-50"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Right;