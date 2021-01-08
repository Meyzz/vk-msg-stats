import React, { FC } from 'react';
import { Avatar, Navbar } from 'rsuite';
import style from 'components/Header/Header.module.scss';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react';

export const Header: FC = observer(() => {
  const {
    userStore: { accountGetProfileInfo, getUserData },
  } = useStores();

  return (
    <Navbar className={style.header}>
      <Navbar.Header className={style.logo}>
        <h4>ВК статистика сообщений</h4>
      </Navbar.Header>
      <div className={style.profile}>
        <Avatar
          circle
          src={getUserData.data ? getUserData.data[0].photo_50 : undefined}
        />
        <div>{accountGetProfileInfo.data?.first_name}</div>
      </div>
    </Navbar>
  );
});
