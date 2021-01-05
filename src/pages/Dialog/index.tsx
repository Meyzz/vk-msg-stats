import React, { FC, useEffect, useMemo } from 'react';
import { Page } from 'components';
import { useHistory, useParams } from 'react-router-dom';
import { useStores } from 'hooks/useStores';
import { Toolbar } from 'pages/Dialog/Toolbar';
import style from './Dialog.module.scss';
import { PATHS } from 'router/paths';
import { observer } from 'mobx-react';
import { Loader, Progress } from 'rsuite';
import { AnalysisState } from 'stores/DialogStore/types';
import { Results } from 'pages/Dialog/Results';

export const DialogPage: FC = observer(() => {
  const { id } = useParams<{ id: string }>();

  const {
    dialogStore: {
      results,
      analysisState,
      getDialogInfo,
      startAnalysis,
      stopAnalysis,
    },
  } = useStores();

  const history = useHistory();

  const handleBackClick = () => {
    history.push(`/${PATHS.INDEX}`);
  };

  useEffect(() => {
    if (!getDialogInfo.fetchCalled) {
      getDialogInfo.fetch({ peer_id: id });
    }
    return () => {
      getDialogInfo.reset();
    };
  }, [getDialogInfo, id]);

  const foundProfile = getDialogInfo.data?.profiles.find(
    (p) => p.id === parseInt(id, 10)
  );

  const messagesCount = getDialogInfo.data?.count;

  useEffect(() => {
    if (messagesCount && id && analysisState === AnalysisState.INACTIVE) {
      startAnalysis(parseInt(id, 10), messagesCount);
    }
  }, [analysisState, id, messagesCount, startAnalysis]);

  useEffect(() => {
    return () => {
      stopAnalysis();
    };
  }, [stopAnalysis]);

  const analysisProgressPercent = useMemo(() => {
    return results.all.count
      ? Math.floor((results.checkedCount / results.all.count) * 100)
      : 0;
  }, [results.checkedCount, results.all.count]);

  return (
    <Page>
      <div className={style.toolbar}>
        <Toolbar profile={foundProfile} onBackClick={handleBackClick} />
      </div>
      {analysisState === AnalysisState.ACTIVE && (
        <Progress.Line percent={analysisProgressPercent} />
      )}
      {analysisState === AnalysisState.DONE && <Results data={results} />}
      {getDialogInfo.loading && <Loader backdrop size="lg" />}
    </Page>
  );
});
