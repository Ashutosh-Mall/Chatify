import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

const Right = () => {
  const {
    messages,
    selectedUser,
    sendMessage,
    setSelectedUser,
  } = useChat();

  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const bottomRef = useRef(null);
  const pickerRef = useRef(null);

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;

    await sendMessage(selectedUser._id, text);
    setText("");
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#111B21] text-gray-400">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">
            Welcome to Chatify
          </h2>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-[#0B141A]">

      <div className="bg-[#202C33] text-white p-4 border-b border-gray-700 flex items-center gap-3">
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden"
        >
          <IoArrowBack size={24} />
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          {selectedUser.userName[0].toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold">
            {selectedUser.userName}
          </h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-[#0B141A]">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`max-w-[75%] px-4 py-2 rounded-2xl break-words ${
              msg.senderId === selectedUser._id
                ? "bg-white text-black self-start"
                : "bg-[#25D366] text-black self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="bg-[#202C33] p-3 border-t border-gray-700 flex items-center gap-2 relative">

        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-yellow-400 text-2xl px-2"
        >
          <FaSmile />
        </button>

        {showEmojiPicker && (
          <div
            ref={pickerRef}
            className="absolute bottom-16 left-2 z-50"
          >
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              theme="dark"
              width={300}
              height={400}
            />
          </div>
        )}

        <input
          type="text"
          value={text}
          disabled={!selectedUser}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSend()
          }
          placeholder="Type a message..."
          className="flex-1 bg-[#2A3942] text-white px-4 py-3 rounded-full outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!selectedUser}
          className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-black hover:scale-105 transition"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Right;