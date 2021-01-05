import React, { FC } from 'react';
import { LineChart } from '@rsuite/charts';
import style from './Results.module.scss';
import { Panel } from 'rsuite';

const arr = [
  ['январь', 211],
  ['февраль', 3213],
  ['март', 443],
  ['апрель', 321],
  ['май', 22],
  ['июнь', 700],
  ['июль', 432],
  ['август', 4324],
  ['сентябрь', 900],
  ['октябрь', 432],
  ['ноябрь', 800],
  ['декабрь', 1234],
];

export const Chart: FC = () => {
  return (
    <Panel
      defaultExpanded
      collapsible
      bordered
      header="График"
      className={style.chart}
    >
      <LineChart name="Сообщения за год" data={arr} />
    </Panel>
  );
};
