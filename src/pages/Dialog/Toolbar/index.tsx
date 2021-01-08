import React, { FC } from 'react';
import { Avatar, Button, FlexboxGrid } from 'rsuite';
import style from './Toolbar.module.scss';
import { ProfileInfo } from 'stores/types';

interface ToolbarProps {
  onBackClick: () => void;
  profile?: ProfileInfo;
}

export const Toolbar: FC<ToolbarProps> = ({ onBackClick, profile }) => {
  return (
    <FlexboxGrid align="middle" justify="space-between">
      <div className={style.title}>
        <Avatar circle src={profile?.photo_50} />
        <h3>
          {profile?.first_name} {profile?.last_name}
        </h3>
      </div>
      <div>
        <Button onClick={onBackClick}>Назад</Button>
      </div>
    </FlexboxGrid>
  );
};
