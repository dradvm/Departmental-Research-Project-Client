"use client";
import { Paper, Stack } from "@mui/material";
import clsx from "clsx";
import { Button } from "components/Button/Button";
import TextField from "components/TextField/TextField";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import messageService from "services/message.service";
import { Message, Thread } from "types/message";
import { formatMessageTime, isWithinTwoMinutes } from "utils/time";
import MyAvatar from "components/Avatar/Avatar";
import { useUser } from "../../../context/UserContext";
import { useMessageContext } from "context/MessageContext";

const MessageItem = ({
  message,
  thread,
  messages,
}: {
  message: Message;
  thread: Thread;
  messages: Message[];
}) => {
  const isThreadUser = useMemo(
    () => message.userSenderId === thread.userId,
    [message, thread]
  );

  const isDisplayTime = useMemo(() => {
    const indexMessage = messages.indexOf(message);
    let display = true;
    if (indexMessage == 0) {
      return true;
    }
    display = !isWithinTwoMinutes(
      messages[indexMessage - 1]?.timeSend,
      message.timeSend
    );
    return display;
  }, [message, messages]);

  const isGroupMessageStart = useMemo(() => {
    const indexMessage = messages.indexOf(message);
    if (indexMessage === 0) {
      return true;
    }
    return (
      messages[indexMessage - 1].userSenderId !== message.userSenderId ||
      !isWithinTwoMinutes(messages[indexMessage - 1].timeSend, message.timeSend)
    );
  }, [message, messages]);
  const isGroupMessageEnd = useMemo(() => {
    const indexMessage = messages.indexOf(message);
    if (indexMessage === messages.length - 1) {
      return true;
    }
    return (
      messages[indexMessage + 1].userSenderId !== message.userSenderId ||
      !isWithinTwoMinutes(messages[indexMessage + 1].timeSend, message.timeSend)
    );
  }, [message, messages]);

  return (
    <div>
      {isDisplayTime && (
        <div className="text-xs text-gray-600 my-3 text-center">
          {formatMessageTime(message.timeSend)}
        </div>
      )}

      <div
        className={clsx(
          "flex items-end gap-3",
          isThreadUser ? "flex-row" : "flex-row-reverse"
        )}
      >
        {isThreadUser && (
          <div className="w-8">
            {isGroupMessageEnd && (
              <MyAvatar
                user={thread}
                width={32}
                height={32}
                fontSize="0.875rem"
              />
            )}
          </div>
        )}

        <div className={clsx(isThreadUser ? "text-left" : "text-right")}>
          <div
            className={clsx(
              "inline-block px-4 py-2 text-sm max-w-md rounded-3xl whitespace-pre-line",
              isThreadUser
                ? "bg-gray-100 text-gray-900"
                : "bg-indigo-600 text-white",
              !isGroupMessageStart &&
                (isThreadUser ? "rounded-tl-lg" : "rounded-tr-lg"),
              !isGroupMessageEnd &&
                (isThreadUser ? "rounded-bl-lg" : "rounded-br-lg")
            )}
            style={{
              marginTop: 1,
            }}
          >
            {message.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThreadPage() {
  const { threadId } = useParams();
  const [thread, setThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { socket } = useMessageContext();
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const { user } = useUser();

  const handleSendMessage = useCallback(() => {
    if (typeof threadId === "string") {
      socket?.emit("sendMessage", {
        userSenderId: user?.userId,
        userReceiverId: parseInt(threadId),
        message: input,
      });
      setInput("");
    }
  }, [user?.userId, socket, threadId, input]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (typeof threadId === "string") {
      messageService
        .getThread(parseInt(threadId))
        .then((res) => {
          setThread(res.data);
        })
        .catch((err) => console.log(err));
      messageService
        .getMessages(parseInt(threadId))
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [threadId]);

  useEffect(() => {
    if (typeof threadId === "string") {
      if (user?.userId) {
        if (!socketId) {
          socket?.emit("joinThread", {
            userId: user?.userId,
            threadId: parseInt(threadId),
          });
          setSocketId(socket?.id);
        }
      }
    }
  }, [threadId, socket, user, socketId]);

  useEffect(() => {
    socket?.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  useEffect(() => console.log(messages), [messages]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        console.log("Enter");
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <Stack className="h-full">
      {thread && (
        <>
          <Paper
            elevation={1}
            square
            className="flex items-center gap-4 px-8 py-4 z-10"
          >
            <MyAvatar user={thread} width={42} height={42} fontSize="1rem" />
            <div>
              <Link
                href={"/"}
                className="font-bold text-lg text-indigo-600 hover:text-indigo-700"
              >
                {thread.name}
              </Link>
            </div>
          </Paper>
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-8 py-6 flex flex-col bg-transparent grow"
          >
            {messages.length > 0 && thread != null ? (
              messages.map((message, index) => (
                <MessageItem
                  key={
                    message.messageId
                      ? `messsageId_${message.messageId}`
                      : `index_${index}`
                  }
                  message={message}
                  thread={thread}
                  messages={messages}
                />
              ))
            ) : (
              <div className="text-gray-400 text-center mt-10">
                Chưa có tin nhắn
              </div>
            )}
          </div>
          {/* Input */}
          <div className="px-8 py-4 border-t border-gray-200 flex gap-3 items-center">
            <TextField
              value={input}
              handleValue={setInput}
              placeholder="Aa"
              handleSubmit={handleSendMessage}
            />
            <Button variant="filled" size="lg" onClick={handleSendMessage}>
              Gửi
            </Button>
          </div>
        </>
      )}
    </Stack>
  );
}
