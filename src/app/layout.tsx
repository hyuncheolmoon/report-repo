'use client';

import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer } from "react-toastify";

import { Navigation, MainHeader } from '@/components';
import { size } from '@/constants';

import "@/assets/scss/index.scss";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ToastContainer />
        <MainHeader />
        <ContentContainer>
          <Navigation />
          <MainContainer>
            {children}
          </MainContainer>
        </ContentContainer>
      </body>
    </html>
  );
}


const ContentContainer = styled.div`
  display: flex;
  height: calc(100vh - ${size.header.height}px);
`;


const MainContainer = styled.main`
  flex-grow: 1;
  overflow-y: auto;
`;
