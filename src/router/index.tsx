import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PATHS } from 'router/paths';
import { MainPage } from 'pages/Main';
import { useStores } from 'hooks/useStores';
import { observer } from 'mobx-react';
import { Loader } from 'rsuite';
import { DialogPage } from 'pages/Dialog';

export const Routes: FC = observer(() => {
  const {
    userStore: { accountGetProfileInfo, getUserData },
  } = useStores();

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
      <Route exact path={`/${PATHS.DIALOG}/:id`}>
        <DialogPage />
      </Route>
      <Route path="*">
        <MainPage />
      </Route>
    </Switch>
  );
});
