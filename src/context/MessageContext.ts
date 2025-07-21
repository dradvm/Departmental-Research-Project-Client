import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

type MessageContextType = {
  socket: Socket | null;
};

const MessageContext = createContext<MessageContextType>({
  socket: null,
});

export function useMessageContext() {
  return useContext(MessageContext);
}
export { MessageContext };
