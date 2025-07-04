export interface Message {
  messageId?: number;
  userSenderId?: number;
  userReceiverId?: number;
  message: string;
  timeSend: string | Date;
}
export interface Thread {
  userId: number;
  name: string;
  img: string;
  isActive: boolean;
  isDeleted: boolean;
  Message_Message_userSenderIdToUser: Message[];
}
