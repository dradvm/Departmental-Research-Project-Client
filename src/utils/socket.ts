import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:3001", {
      withCredentials: true,
    });
  }
  return socket;
};
