import React, { FC } from 'react';
import { List } from 'rsuite';
import { FormattedChat } from 'pages/Main/types';
import { Chat } from 'pages/Main/ChatsList/ChatItems';

interface ChatsList {
  chats: FormattedChat[];
  onChatClick: (id: number) => void;
}

export const ChatsList: FC<ChatsList> = ({ chats, onChatClick }) => {
  return (
    <List hover bordered>
      {chats.map((chat) => {
        return <Chat onClick={onChatClick} chat={chat} key={chat.id} />;
      })}
    </List>
  );
};
