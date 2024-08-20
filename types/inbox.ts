export interface ChatMessage {
  groupId: string;
  groupName: string;
  messages: Message[];
}

export interface ChatRoomProps {
  groupName: string | null;
  chatData: ChatMessage[];
  leaveChatRoom: () => void;
}

export interface ChatListProps {
  chatData: ChatMessage[];
  enterChatRoom: (groupName: string) => void;
}

export interface Message {
  id: number;
  name: string;
  body: string;
  date: string;
  time: string;
  is_new: boolean;
}
