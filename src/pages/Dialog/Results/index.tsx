import React, { FC } from 'react';
import { AnalysisResults } from 'stores/DialogStore/types';
import { FlexboxGrid } from 'rsuite';
import { VoiceResults } from 'pages/Dialog/Results/VoiceResults';
import { AllResults } from 'pages/Dialog/Results/AllResults';
import { Chart } from 'pages/Dialog/Results/Chart';

interface ResultsProps {
  data: AnalysisResults;
}

export const Results: FC<ResultsProps> = ({ data }) => {
  return (
    <div>
      <FlexboxGrid justify="space-between">
        <AllResults data={data} />
        <VoiceResults data={data} />
      </FlexboxGrid>
      <Chart />
    </div>
  );
};
