import WebSocket, { WebSocketServer } from "ws";
import { RedisManager } from "./redis";
import { UserManager } from "./user";
import { Server } from "node:http";
import { channel } from "node:diagnostics_channel";
import { parseArgs } from "node:util";


export class ChatServer {
  private pubSub: RedisManager;
  private userManager: UserManager;
  private roomHosts: Map<string, string>;
  private wss: WebSocketServer;

  constructor(httpServer: Server) {
    this.pubSub = new RedisManager();
    this.userManager = new UserManager();
    this.roomHosts = new Map();
    this.wss = new WebSocketServer({ server: httpServer });
    this.wss.on("connection", this.handleConnection.bind(this));
    this.setupPubSub();
  }

  private handleConnection(ws: WebSocket) {
    ws.on("error", console.error);
    ws.on("message", (data) => this.handleMessage(ws, data));
    ws.on("close", () => this.handleClose(ws));
  }

  private setupPubSub() {
    this.pubSub.subscriber.on("message", (channel, message) => {
      const parsedMessage = JSON.parse(message);
      const users = this.userManager.getUsersInRoom(channel);

      users.forEach((user) => {
        user.ws.send(JSON.stringify(parsedMessage));
      });
    });
  }

  private async handleMessage(ws: WebSocket, data: WebSocket.RawData) {
    try {
      const parsedData = JSON.parse(data.toString());
      const { type, userId, roomCode, userData } = parsedData;

      if (!this.userManager.getUser(userId)) {
        this.userManager.addUser(userId, ws, userData);
      }

      switch (type) {
        case "JOIN_ROOM":
          await this.handleJoinRoom(userId, roomCode);
          break;
        case "SEND_MESSAGE":
          await this.handleSendMessage(userId, roomCode, parsedData.message!);
          break;
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }

  private async handleJoinRoom(userId: string, roomCode: string) {
    try {
      const user = this.userManager.getUser(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      this.userManager.addUserToRoom(userId, roomCode);
      await this.pubSub.subscribe(roomCode);

      if (!this.roomHosts.has(roomCode)) {
        this.roomHosts.set(roomCode, userId);
      }

      const roomMembers = this.userManager
        .getAllUsers()
        .filter((u) => u.rooms.includes(roomCode))
        .map((u) => ({
          id: u.userId,
          username: u.username,
          image: u.image,
          isHost: u.userId === this.roomHosts.get(roomCode),
        }));

      this.pubSub.publish(roomCode, {
        type: "ROOM_MEMBERS",
        members: roomMembers,
      });
    } catch (error) {
      console.error(`Error handling join room for user ${userId}:`, error);
      throw error;
    }
  }

  private async handleSendMessage(userId: string, roomCode: string, message: string ) {
    try {
      const user = this.userManager.getUser(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      this.pubSub.publish(roomCode, {
        type: "MESSAGE",
        userId: userId,
        message: message,
        userData: {
          username: user.username,
          image: user.image,
        },
      });
    } catch (error) {
      console.error("Error handling send message:", error);
      throw error;
    }
  }

  private handleClose(ws: WebSocket) {
    const userEntry = this.userManager.getUserByWs(ws);
    if (userEntry) {
      const [userId, user] = userEntry;
      const rooms = user.rooms;

      rooms.forEach((roomCode) => {
        this.pubSub.publish(roomCode, {
          type: "MEMBER_LEFT",
          memberId: userId,
        });
      });

      this.userManager.removeUser(userId);
    }
  }
}