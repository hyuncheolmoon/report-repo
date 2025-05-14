'use client';

import React from 'react';
import styled from '@emotion/styled';

import { palette, size } from '../constants';

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Report</Title>
    </HeaderContainer>
  );
};

export default Header;


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;

  color: ${palette.gray900};
  background-color: ${palette.white};

  padding: 0 16px;
  min-height: ${size.header.height}px;
  border-bottom: 1px solid ${palette.gray100};

`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
`;