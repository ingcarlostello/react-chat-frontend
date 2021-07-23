// @React
import React from "react";

// @Routes
import { AppRouter } from "./router/AppRouter";

// @Context
import { SocketProvider } from "./context/SocketContext";
import AuthProvider from "./auth/AuthContext";
import ChatProvider from "./context/chat/ChatContext";


export const ChatApp = () => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};
