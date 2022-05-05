import { io, Socket } from "socket.io-client";

// please note that the types are reversed
const socket: Socket = io("http://localhost:8000");

export { socket };
