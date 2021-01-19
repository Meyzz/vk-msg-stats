import { FormattedChat } from 'pages/Main/types';
import { Avatar, FlexboxGrid, List, Tag, Notification } from 'rsuite';
import style from './ChatsList.module.scss';
import React, { FC } from 'react';

interface ChatProps {
  chat: FormattedChat;
  onClick: (id: number) => void;
}

export const Chat: FC<ChatProps> = ({ chat, onClick }) => {
  const handleChatClick = () => {
    if (chat.type !== 'user') {
      Notification.error({
        title: 'Произошла ошибка',
        description: 'На текущий момент поддерживается только анализ диалогов',
        placement: 'bottomEnd',
      });
    } else {
      onClick(chat.id);
    }
  };

  return (
    <List.Item className={style.itemContainer} onClick={handleChatClick}>
      <FlexboxGrid align="middle" justify="space-between">
        <div className={style.title}>
          <Avatar circle src={chat.photo_50} />
          <div>{chat.title}</div>
        </div>
        <div>
          <Tag className={style.count} color="blue">{chat.count}</Tag>
        </div>
      </FlexboxGrid>
    </List.Item>
  );
};
