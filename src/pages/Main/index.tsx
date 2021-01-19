import React, { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import { Page } from 'components';
import { ChatsList } from 'pages/Main/ChatsList';
import { formatChats } from 'pages/Main/formatChats';
import style from './Main.module.scss';
import {
  FlexboxGrid,
  Icon,
  Input,
  InputGroup,
  Loader,
  Pagination,
} from 'rsuite';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'router/paths';
import {
  loadChatsExecute,
  searchChatsExecute,
} from 'stores/ChatsStore/loadChats';

export const MainPage: FC = observer(() => {
  const {
    chatsStore: {
      getChatsList,
      setActivePage,
      activePage,
      searchValue,
      setSearchValue,
      searchChatsList,
    },
  } = useStores();

  const { chatsStore } = useStores();

  const history = useHistory();

  useEffect(() => {
    if (!getChatsList.fetchCalled) {
      getChatsList.fetch();
    }
  }, [getChatsList]);

  const chats = useMemo(() => {
    return getChatsList.data ? formatChats(getChatsList.data) : [];
  }, [getChatsList.data]);

  const searchChats = useMemo(() => {
    return searchChatsList.data ? formatChats(searchChatsList.data) : [];
  }, [searchChatsList.data]);

  const handleChatClick = (id: number) => {
    history.push(`/${PATHS.DIALOG}/${id}`);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
    getChatsList.fetch({
      code: loadChatsExecute({
        extended: 1,
        count: 10,
        offset: 10 * (page - 1),
      }),
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    setTimeout(() => {
      if (chatsStore.searchValue === value) {
        if (value) {
          searchChatsList.fetch({
            code: searchChatsExecute({
              extended: 1,
              count: 10,
              q: searchValue,
            }),
          });
        } else {
          searchChatsList.reset();
        }
      }
    }, 500);
  };

  const count = getChatsList.data?.chats.count || 0;

  return (
    <Page>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item>
          <h3 className={style.title}>Мои диалоги (Всего {count})</h3>
        </FlexboxGrid.Item>
        <FlexboxGrid>
          <InputGroup>
            <Input
              onChange={handleSearchChange}
              value={searchValue}
              placeholder="Поиск..."
            />
            <InputGroup.Addon>
              <Icon icon="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FlexboxGrid>
      </FlexboxGrid>
      <ChatsList
        onChatClick={handleChatClick}
        chats={searchValue ? searchChats : chats}
      />
      {!searchValue && (
        <Pagination
          activePage={activePage}
          className={style.pagination}
          maxButtons={5}
          prev
          onSelect={handlePageChange}
          next
          last
          first
          pages={Math.ceil(count / 10)}
        />
      )}
      {(getChatsList.loading || searchChatsList.loading) && (
        <Loader size="lg" backdrop />
      )}
    </Page>
  );
});
