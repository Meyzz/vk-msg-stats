import React, { FC } from 'react';
import style from 'pages/Dialog/Results/Results.module.scss';
import { FlexboxGrid, Panel, Progress } from 'rsuite';
import { AnalysisResults } from 'stores/DialogStore/types';
import { formatTime } from 'utils/formatTime';
import { PanelHeader } from 'pages/Dialog/Results/PanelHeader';

interface VoiceResultsProps {
  data: AnalysisResults;
}

export const VoiceResults: FC<VoiceResultsProps> = ({ data }) => {
  const { from, count, to } = data.voice;
  const fromVoicePercent = Math.round((from / count) * 100) || 0;
  const toVoicePercent = Math.round((to / count) * 100) || 0;
  return (
    <FlexboxGrid.Item className={style.container} colspan={12}>
      <Panel
        header={
          <PanelHeader
            disabled
            title={`Голосовые сообщения (${formatTime(count)})`}
          />
        }
        bordered
        className={style.panel}
      >
        <FlexboxGrid>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle strokeColor="#4caf50" percent={toVoicePercent} />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Отправлено ${formatTime(to)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle
                strokeColor="#f44336"
                percent={fromVoicePercent}
              />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Получено ${formatTime(from)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
    </FlexboxGrid.Item>
  );
};
