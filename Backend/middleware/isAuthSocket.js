import jwt from "jsonwebtoken";
import cookie from "cookie";

export const socketAuth = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    const token = cookies.chatifyToken;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.userId = decoded.userId;

    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
};
