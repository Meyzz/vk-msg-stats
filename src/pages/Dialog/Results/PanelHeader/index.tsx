import React, { FC } from 'react';
import { FlexboxGrid, SelectPicker } from 'rsuite';
import style from './PanelHeader.module.scss';

interface PanelHeaderProps {
  title: string;
  disabled?: boolean;
}

export const PanelHeader: FC<PanelHeaderProps> = ({ title, disabled }) => {
  return (
    <FlexboxGrid
      className={style.container}
      align="middle"
      justify="space-between"
    >
      <FlexboxGrid.Item>{title}</FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <SelectPicker
          disabled={disabled}
          cleanable={false}
          style={{ width: 150 }}
          value="all"
          searchable={false}
          size="sm"
          data={[{ label: 'За всё время', value: 'all' }]}
        />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
