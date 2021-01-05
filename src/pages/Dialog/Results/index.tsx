import React, { FC } from 'react';
import { AnalysisResults } from 'stores/DialogStore/types';

interface ResultsProps {
  data: AnalysisResults;
}

export const Results: FC<ResultsProps> = ({ data }) => {
  return <div>{JSON.stringify(data, null, '/t')}</div>;
};
