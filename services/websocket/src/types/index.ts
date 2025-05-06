import WebSocket from "ws";

export type User = {
    userId: string;
    name: string;
    image: string | null;
    ws: WebSocket;
    rooms: string[];
};
