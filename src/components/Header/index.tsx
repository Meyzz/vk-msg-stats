import React, { FC } from 'react';
import { Avatar, Button, Icon, Navbar } from 'rsuite';
import style from 'components/Header/Header.module.scss';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react';

export const Header: FC = observer(() => {
  const {
    userStore: { accountGetProfileInfo, getUserData },
  } = useStores();

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    window.close();
  };

  return (
    <Navbar className={style.header}>
      <Navbar.Header className={style.logo}>
        <h4>ВК статистика сообщений</h4>
      </Navbar.Header>
      <div className={style.headerRight}>
        <div className={style.profile}>
          <Avatar
            circle
            src={getUserData.data ? getUserData.data[0].photo_50 : undefined}
          />
          <div>{accountGetProfileInfo.data?.first_name}</div>
        </div>
        <Button onClick={handleLogoutClick} color="blue" appearance="primary">
          <Icon icon="sign-out" />
          <span> Выйти</span>
        </Button>
      </div>
    </Navbar>
  );
});
