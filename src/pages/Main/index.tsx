import React, { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from 'hooks/useRootStore';
import { Page } from 'components';
import { ChatsList } from 'pages/Main/ChatsList';
import { formatChats } from 'pages/Main/formatChats';
import style from './Main.module.scss';
import { Loader } from 'rsuite';

export const MainPage: FC = observer(() => {
  const {
    userStore,
    chatsStore: { getChatsList },
  } = useRootStore();

  useEffect(() => {
    if (!getChatsList.fetchCalled) {
      getChatsList.fetch();
    }
  }, [getChatsList]);

  const chats = useMemo(() => {
    return getChatsList.data ? formatChats(getChatsList.data) : [];
  }, [getChatsList.data]);

  return (
    <Page>
      <h3 className={style.title}>
        Мои диалоги (Всего {getChatsList.data?.chats.count})
      </h3>
      <ChatsList chats={chats} />
      {getChatsList.loading && <Loader size="lg" backdrop />}
    </Page>
  );
});
