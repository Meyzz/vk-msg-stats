import React, { FC } from 'react';
import style from 'pages/Dialog/Results/Results.module.scss';
import { FlexboxGrid, Panel, Progress } from 'rsuite';
import { AnalysisResults } from 'stores/DialogStore/types';
import {formatTime} from "utils/formatTime";

interface VoiceResultsProps {
  data: AnalysisResults;
}

export const VoiceResults: FC<VoiceResultsProps> = ({ data }) => {
  const fromVoicePercent = Math.round((data.fromVoice / data.fullVoice) * 100);
  const toVoicePercent = Math.round((data.toVoice / data.fullVoice) * 100);
  return (
    <FlexboxGrid.Item className={style.container} colspan={12}>
      <Panel
        header={`Голосовые сообщения (${formatTime(data.fullVoice)})`}
        bordered
        collapsible
        defaultExpanded
        className={style.panel}
      >
        <FlexboxGrid>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle strokeColor="#4caf50" percent={toVoicePercent} />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Вы отправили ${formatTime(data.toVoice)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className={style.statsItem} colspan={12}>
            <Panel bordered shaded>
              <Progress.Circle strokeColor="#f44336" percent={fromVoicePercent} />
              <Panel
                className={style.innerPanel}
                bodyFill
                header={`Вам отправили ${formatTime(data.fromVoice)}`}
              />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
    </FlexboxGrid.Item>
  );
};
