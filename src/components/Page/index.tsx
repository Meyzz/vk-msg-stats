import React, { FC } from 'react';
import { Container, Navbar, Header as HeaderLayout, Content } from 'rsuite';
import { Header } from 'components/Header';
import style from './Page.module.scss';

export const Page: FC = ({ children }) => {
  return (
    <Container>
      <HeaderLayout>
        <Header />
      </HeaderLayout>
      <Content className={style.content}>{children}</Content>
    </Container>
  );
};
