import React, { FC } from 'react';
import { List } from 'rsuite';
import { FormattedChat } from 'pages/Main/types';
import { Chat } from 'pages/Main/ChatsList/ChatItems';

interface ChatsList {
  chats: FormattedChat[];
}

export const ChatsList: FC<ChatsList> = ({ chats }) => {
  return (
    <List hover>
      {chats.map((chat) => {
        return <Chat chat={chat} key={chat.id} />;
      })}
    </List>
  );
};
