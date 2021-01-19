import React, { FC } from 'react';
import { FlexboxGrid, Panel, Progress } from 'rsuite';
import style from 'pages/Dialog/Results/Results.module.scss';
import { AnalysisResults } from 'stores/DialogStore/types';
import { formatNumber } from 'utils';
import { PanelHeader } from 'pages/Dialog/Results/PanelHeader';

interface AllResultsProps {
  data: AnalysisResults;
}

export const AllResults: FC<AllResultsProps> = ({ data }) => {
  const { count, from, to } = data.all;
  const fromPercent = Math.round((from / count) * 100);
  const toPercent = Math.round((to / count) * 100);
  return (
    <FlexboxGrid.Item className={style.container} colspan={12}>
      <Panel
        header={
          <PanelHeader
            disabled
            title={`Все сообщения (${formatNumber(count)})`}
          />
        }
        bordered
        className={style.panel}
      >
        <FlexboxGrid>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle strokeColor="#4caf50" percent={toPercent} />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Отправлено ${formatNumber(to)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle strokeColor="#f44336" percent={fromPercent} />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Получено ${formatNumber(from)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
    </FlexboxGrid.Item>
  );
};
