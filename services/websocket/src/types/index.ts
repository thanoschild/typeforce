import WebSocket from "ws";

export type User = {
    userId: string;
    username: string;
    image: string | null;
    ws: WebSocket;
    rooms: string[];
};
