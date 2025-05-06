import { User } from "../types";
import WebSocket from "ws";

export class UserManager {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  addUser(
    userId: string,
    ws: WebSocket,
    userData?: { name: string; image: string | null }
  ) {
    const user = {
      userId,
      name: userData?.name || "Anonymous",
      image: userData?.image || null,
      ws,
      rooms: [],
    };
    this.users.set(userId, user);
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  removeUser(userId: string): boolean {
    const user = this.users.get(userId);
    if (user) {
      user.ws.close();
      return this.users.delete(userId);
    }
    return false;
  }

  getUserByWs(ws: WebSocket): [string, User] | null {
    for (const [userId, user] of this.users.entries()) {
      if (user.ws === ws) return [userId, user];
    }
    return null;
  }

  addUserToRoom(userId: string, roomId: string): boolean {
    const user = this.users.get(userId);
    if (user && !user.rooms.includes(roomId)) {
      user.rooms.push(roomId);
      return true;
    }
    return false;
  }

  getUsersInRoom(roomId: string) {
    return Array.from(this.users.values()).filter((user) =>
      user.rooms.includes(roomId)
    );
  }

  getAllUsers() {
    return Array.from(this.users.values());
  }

  getUserCount() {
    return this.users.size;
  }
}