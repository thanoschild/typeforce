'use client'

import React, { createContext, useContext, useRef, useState, useCallback } from "react";

type WebSocketContextType = {
  wsRef: WebSocket | null;
  setWsRef: (ws: WebSocket) => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wsRef, setWs] = useState<WebSocket | null>(null);

  const setWsRef = useCallback((ws: WebSocket) => {
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null);
    };

    setWs(ws);
  }, []);

  return (
    <WebSocketContext.Provider value={{ wsRef, setWsRef }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
