import { FormattedChat } from 'pages/Main/types';
import {Avatar, FlexboxGrid, List, Tag} from 'rsuite';
import style from './ChatsList.module.scss';
import React from 'react';

export const Chat = ({ chat }: { chat: FormattedChat }) => {
  return (
    <List.Item>
      <FlexboxGrid align="middle" justify="space-between">
        <div className={style.title}>
          <Avatar circle src={chat.photo_50} />
          <div>{chat.title}</div>
        </div>
        <div>
            <Tag color="red">{chat.count}</Tag>
        </div>
      </FlexboxGrid>
    </List.Item>
  );
};
