import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATHS } from 'router/paths';
import { MainPage } from 'pages/Main';
import { useRootStore } from 'hooks/useRootStore';
import { observer } from 'mobx-react';
import { Loader } from 'rsuite';

export const Routes: FC = observer(() => {
  const {
    userStore: { accountGetProfileInfo, getUserData },
  } = useRootStore();

  useEffect(() => {
    if (!accountGetProfileInfo.fetchCalled) {
      accountGetProfileInfo.fetch();
    }
  }, [accountGetProfileInfo]);

  useEffect(() => {
    if (!getUserData.fetchCalled) {
      getUserData.fetch({ fields: ['photo_50'] });
    }
  }, [getUserData]);

  if (!accountGetProfileInfo.data) {
    return <Loader size="lg" backdrop />;
  }

  return (
    <Switch>
      <Route path={PATHS.INDEX}>
        <MainPage />
      </Route>
    </Switch>
  );
});
