'use client';

import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';

import { Navigation, MainHeader } from '@/components';
import { size } from '@/constants';
import { ConfirmProvider } from '@/contexts/confirm-context';

import '@/assets/scss/index.scss';
import { usePathHandler } from '@/hooks';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { showNavbar } = usePathHandler();
  return (
    <html lang="ko">
      <body>
        <ConfirmProvider>
          <ToastContainer />
          <MainHeader />
          <ContentContainer>
            {showNavbar && <Navigation />}
            <MainContainer>{children}</MainContainer>
          </ContentContainer>
        </ConfirmProvider>
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
