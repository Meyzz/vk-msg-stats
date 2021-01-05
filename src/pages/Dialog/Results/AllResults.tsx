import React, { FC } from 'react';
import { FlexboxGrid, Panel, Progress } from 'rsuite';
import style from 'pages/Dialog/Results/Results.module.scss';
import { AnalysisResults } from 'stores/DialogStore/types';
import {formatNumber} from "utils";

interface AllResultsProps {
  data: AnalysisResults;
}

export const AllResults: FC<AllResultsProps> = ({ data }) => {
  const fromPercent = Math.round((data.fromCount / data.count) * 100);
  const toPercent = Math.round((data.toCount / data.count) * 100);
  return (
    <FlexboxGrid.Item className={style.container} colspan={12}>
      <Panel
        header={`Все сообщения (${formatNumber(data.count)})`}
        bordered
        className={style.panel}
        collapsible
        defaultExpanded
      >
        <FlexboxGrid>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle strokeColor="#4caf50" percent={toPercent} />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Вы отправили ${formatNumber(data.toCount)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle strokeColor="#f44336" percent={fromPercent} />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Вам отправили ${formatNumber(data.fromCount)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
    </FlexboxGrid.Item>
  );
};
