"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, MessagesSquare } from "lucide-react";
import { ChatMessageProps, ChatProps, Message } from "@/types/chat";
import { useWebSocket } from "@/context/WebSocketContext";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { RiWechatLine } from "react-icons/ri";
import Avatar from "../core/Avatar";

const Chat = ({ code }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { wsRef } = useWebSocket();
  const { data: session } = useSession();

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!inputMessage.trim() || !wsRef || !session?.user) return;

      wsRef.send(
        JSON.stringify({
          type: "SEND_MESSAGE",
          userId: session.user.id,
          roomCode: code,
          message: inputMessage.trim(),
        })
      );

      setInputMessage("");
    },
    [inputMessage, wsRef, session, code]
  );

  useEffect(() => {
    if (!wsRef) return;

    const handleWebSocketMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "MESSAGE") {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            sender: {
              username: data.userData.username,
              image: data.userData.image,
            },
            text: data.message,
          },
        ]);
        setTimeout(scrollToBottom, 100);
      }
    };

    wsRef.addEventListener("message", handleWebSocketMessage);
    return () => wsRef.removeEventListener("message", handleWebSocketMessage);
  }, [wsRef, scrollToBottom]);

  console.log("message: ", messages)

  return (
    <div className="lg:col-span-2 bg-theme-sub-alt rounded-lg p-4">
      <div className="mb-4 text-theme-text">
        <h2 className="flex items-center gap-x-3 text-xl font-semibold">
          <RiWechatLine className="w-8 h-8" />
          Room Chat
        </h2>
      </div>
      <div className="space-y-4">
        <div
          className="h-[400px] overflow-y-auto pr-4 space-y-4"
          ref={scrollAreaRef}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-md px-4 py-2 bg-theme-bg text-theme-text outline-none transition-all duration-200 border border-transparent focus:border-theme-text placeholder:text-theme-sub"
        />
          <button
            type="submit"
            className="bg-theme-bg text-theme-text p-2 rounded-md disabled:text-theme-sub"
            disabled={!inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const initials = message.sender.username
    ? message.sender.username
        .split(" ")
        .map((part) => part[0].toUpperCase())
        .join("")
    : "?";

  return (
    <div className="flex items-start gap-3">
      <Avatar name={message.sender.username} image={message.sender.image || ""}/>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-theme-text text-sm">
            {message.sender.username}
          </span>
        </div>
        <p className="text-theme-sub">{message.text}</p>
      </div>
    </div>
  );
};

export default Chat;
