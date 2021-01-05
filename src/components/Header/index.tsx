import React, { FC, useEffect } from 'react';
import { Avatar, Nav, Navbar } from 'rsuite';
import style from 'components/Header/Header.module.scss';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react';

export const Header: FC = observer(() => {
  const {
    userStore: { accountGetProfileInfo, getUserData},
  } = useStores();

    return (
    <Navbar className={style.header}>
      <Navbar.Header className={style.logo}>
        <a href="/">
          <h4>vk-msg-stats</h4>
        </a>
      </Navbar.Header>
      <div className={style.profile}>
        <Avatar circle src={getUserData.data ? getUserData.data[0].photo_50 : undefined}  />
        <div>{accountGetProfileInfo.data?.first_name}</div>
      </div>
    </Navbar>
  );
});
