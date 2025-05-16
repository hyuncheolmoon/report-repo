'use client';

import React from 'react';
import styled from '@emotion/styled';
import { palette } from '@/constants';
import { QuestionContainer } from '../../../assets/styled/servey';

type ViewTitleBoxProps = {
  subject: string;
  description?: string;
};

const ViewTitleBox = ({ subject, description }: ViewTitleBoxProps) => {
  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <QuestionContainer>
      <TitleWrapper>{subject}</TitleWrapper>
      <DescriptionWrapper>{description}</DescriptionWrapper>
    </QuestionContainer>
  );
};

export default ViewTitleBox;

const TitleWrapper = styled.div`
  font-size: 28px;
  font-weight: 400;
  color: ${palette.gray900};
`;

const DescriptionWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray700};
  white-space: pre-wrap;
`;
