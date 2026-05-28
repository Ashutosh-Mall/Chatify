import User from "../models/User.js";
import Message from "../models/Message.js";
import {io, getSocketId} from "../socket/server.js";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.userId;
    const users = await User.find({
      _id: {$ne: loggedInUserId},
    }).select("-password");

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Get Users Error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const {receiverId} = req.params;
    const {text} = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text.trim(),
    });

    const receiverSocketId = getSocketId(receiverId);
    const senderSocketId = getSocketId(senderId);
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log("Send Message Error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.userId;
    const {receiverId} = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    }).sort({createdAt: 1});

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("Get Messages Error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
