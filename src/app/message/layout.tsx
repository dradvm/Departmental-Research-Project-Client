"use client";
import { useState, useEffect, ReactNode, useContext, useMemo } from "react";
import Divider from "@mui/material/Divider";
import clsx from "clsx";
import { Stack } from "@mui/material";
import { Message, Thread } from "types/message";
import messageService from "services/message.service";
import { getTimeAgo } from "utils/time";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Socket } from "socket.io-client";
import { getSocket } from "utils/socket";
import { createContext } from "react";
import { useSession } from "next-auth/react";
import MyAvatar from "components/Avatar/Avatar";

type MessageContextType = {
  socket: Socket | null;
};

const MessageContext = createContext<MessageContextType>({
  socket: null,
});

export function useMessageContext() {
  return useContext(MessageContext);
}

const ThreadItem = ({
  handleClick,
  selectedUserId,
  thread,
  userId,
}: {
  handleClick: () => void;
  selectedUserId: number | undefined;
  thread: Thread;
  userId: number | undefined;
}) => {
  const message: Message = useMemo(() => {
    if (
      new Date(thread.Message_Message_userReceiverIdToUser[0].timeSend) >
      new Date(thread.Message_Message_userSenderIdToUser[0].timeSend)
    ) {
      return thread.Message_Message_userReceiverIdToUser[0];
    } else {
      return thread.Message_Message_userSenderIdToUser[0];
    }
  }, [thread]);
  return (
    <Link
      href={`/message/${thread.userId}`}
      onClick={handleClick}
      className={clsx(
        "flex items-center  px-4 py-4 cursor-pointer transition-all space-x-3",
        selectedUserId === thread.userId ? "bg-gray-200" : "hover:bg-gray-100"
      )}
    >
      <MyAvatar user={thread} />
      <Stack className="grow">
        <div className="font-semibold text-base">{thread.name}</div>
        <div className="flex justify-between">
          <div
            className={`text-xs truncate max-w-96 ${
              userId === message.userReceiverId &&
              message.seenAt === null &&
              message.userSenderId !== selectedUserId
                ? "text-black font-medium"
                : "text-gray-500 "
            }`}
          >
            {(message.userSenderId === userId ? "Bạn: " : "") + message.message}
          </div>
          <div className="text-xs text-gray-600 flex-shrink-0">
            {getTimeAgo(message.timeSend, "")}
          </div>
        </div>
      </Stack>
      {userId === message.userReceiverId &&
        message.seenAt === null &&
        message.userSenderId !== selectedUserId && (
          <div className="rounded-full w-3 h-3 bg-indigo-600"></div>
        )}
    </Link>
  );
};

export default function MessageLayout({ children }: { children: ReactNode }) {
  const { threadId } = useParams();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    typeof threadId === "string" ? parseInt(threadId) : undefined
  );
  const [threads, setThreads] = useState<Thread[]>([]);
  const socket = useMemo<Socket>(() => getSocket(), []);

  const { data: session } = useSession();

  const loadThreads = () => {
    messageService
      .getThreads()
      .then((res) => setThreads(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadThreads();
  }, []);

  useEffect(() => {
    socket.emit("register", {
      userId: session?.user.userId,
    });
    socket.on("receiveThread", () => {
      console.log("Nhận tin nhắn mới");
      loadThreads();
    });
  }, [socket, session]);

  return (
    <MessageContext value={{ socket: socket }}>
      <div className="flex h-[650px]">
        {/* Sidebar */}
        <aside className="w-[400px] border-r border-gray-200 bg-white/80 backdrop-blur-lg flex flex-col shadow-lg">
          <Stack className="px-8 py-6">
            <div className="text-2xl font-bold flex items-center gap-2">
              Tin nhắn
            </div>
            <div className="font-thin text-lg flex items-center gap-2">
              Bạn có 0 tin nhắn chưa đọc
            </div>
          </Stack>
          <Divider />
          <div className="flex-1 overflow-y-auto">
            {threads.map((thread, index) => (
              <ThreadItem
                key={index}
                thread={thread}
                handleClick={() => setSelectedUserId(thread.userId)}
                selectedUserId={selectedUserId}
                userId={session?.user.userId}
              />
            ))}
          </div>
        </aside>

        <main className="grow">{children}</main>
      </div>
    </MessageContext>
  );
}
