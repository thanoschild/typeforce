// useSocket.ts
import { WS_URL } from "@/constants";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/context/WebSocketContext"; // adjust path as needed

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { setWsRef } = useWebSocket();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
      setWsRef(ws);
    };

    return () => {
      ws.close();
    };
  }, [setWsRef]);

  return socket;
};

export default useSocket;
