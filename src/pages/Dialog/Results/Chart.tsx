import React, { FC, useMemo, useState } from 'react';
import { Line, LineChart } from '@rsuite/charts';
import style from './Results.module.scss';
import { FlexboxGrid, Panel, SelectPicker } from 'rsuite';
import { AnalysisResults } from 'stores/DialogStore/types';

const months = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

interface ChartProps {
  data: AnalysisResults;
}

export const Chart: FC<ChartProps> = ({ data }) => {
  const selectOptions = useMemo(() => {
    return Object.keys(data.dates)
      .map((year) => ({
        label: `За ${year} год`,
        value: year,
      }))
      .reverse();
  }, [data.dates]);

  const [selectedYear, setSelectedYear] = useState(selectOptions[0].value);

  const chartData = useMemo(() => {
    const yearData = data.dates[parseInt(selectedYear, 10)] || {};
    return months.map((month, index) => {
      return [month, yearData[index]?.count || 0, yearData[index]?.from || 0, yearData[index]?.to || 0];
    });
  }, [data.dates, selectedYear]);

  return (
    <Panel
      bordered
      header={
        <FlexboxGrid
          className={style.panelHeader}
          align="middle"
          justify="space-between"
        >
          <FlexboxGrid.Item>График</FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <SelectPicker
              cleanable={false}
              style={{ width: 150 }}
              value={selectedYear}
              onSelect={(value) => setSelectedYear(value)}
              searchable={false}
              size="sm"
              data={selectOptions}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      }
      className={style.chart}
    >
      <LineChart data={chartData}>
        <Line name="Всего" />
        <Line color="#4caf50" name="Отправлено" />
        <Line color="#f44336" name="Получено" />
      </LineChart>
    </Panel>
  );
};
