"use client";
import { useState, useEffect, ReactNode, useContext, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import clsx from "clsx";
import { Stack } from "@mui/material";
import { getInitials } from "utils/text";
import { User } from "lucide-react";
import { Thread } from "types/message";
import messageService from "services/message.service";
import { getTimeAgo } from "utils/time";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Socket } from "socket.io-client";
import { getSocket } from "utils/socket";
import { createContext } from "react";

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
}: {
  handleClick: () => void;
  selectedUserId: number | undefined;
  thread: Thread;
}) => {
  return (
    <Link
      href={`/message/${thread.userId}`}
      onClick={handleClick}
      className={clsx(
        "flex  px-4 py-4 cursor-pointer transition-all space-x-3",
        selectedUserId === thread.userId ? "bg-gray-200" : "hover:bg-gray-100"
      )}
    >
      <Avatar
        src={
          !thread.isDeleted && thread.isActive
            ? (thread.img ?? undefined)
            : undefined
        }
        alt="image"
        sx={{ width: 48, height: 48, bgcolor: "black", fontSize: "1.125rem" }} // fontSize = text-lg
      >
        {!thread.isDeleted && thread.isActive ? (
          getInitials(thread.name)
        ) : (
          <User size={20} color="white" />
        )}
      </Avatar>
      <Stack className="grow">
        <div className="font-semibold text-base">{thread.name}</div>
        <div className="flex justify-between">
          <div className="text-xs text-gray-500 truncate max-w-96">
            {thread.Message_Message_userSenderIdToUser[0].message}
          </div>
          <div className="text-xs text-gray-600 flex-shrink-0">
            {getTimeAgo(
              thread.Message_Message_userSenderIdToUser[0].timeSend,
              ""
            )}
          </div>
        </div>
      </Stack>
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

  const loadThreads = () => {
    messageService
      .getThreads()
      .then((res) => setThreads(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadThreads();
  }, []);

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
              />
            ))}
          </div>
        </aside>

        <main className="grow">{children}</main>
      </div>
    </MessageContext>
  );
}
