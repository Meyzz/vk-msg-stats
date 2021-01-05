import React, { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import { Page } from 'components';
import { ChatsList } from 'pages/Main/ChatsList';
import { formatChats } from 'pages/Main/formatChats';
import style from './Main.module.scss';
import { Loader } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'router/paths';

export const MainPage: FC = observer(() => {
  const {
    userStore,
    chatsStore: { getChatsList },
  } = useStores();

  const history = useHistory();

  useEffect(() => {
    if (!getChatsList.fetchCalled) {
      getChatsList.fetch();
    }
  }, [getChatsList]);

  const chats = useMemo(() => {
    return getChatsList.data ? formatChats(getChatsList.data) : [];
  }, [getChatsList.data]);

  const handleChatClick = (id: number) => {
    history.push(`/${PATHS.DIALOG}/${id}`);
  };

  return (
    <Page>
      <h3 className={style.title}>
        Мои диалоги (Всего {getChatsList.data?.chats.count})
      </h3>
      <ChatsList onChatClick={handleChatClick} chats={chats} />
      {getChatsList.loading && <Loader size="lg" backdrop />}
    </Page>
  );
});
