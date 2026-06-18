import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {AuthProvider} from "./context/AuthContext.jsx";
import {ChatProvider} from "./context/ChatContext.jsx";
import {BrowserRouter} from "react-router-dom";
import {SocketProvider} from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
