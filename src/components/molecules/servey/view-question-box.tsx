'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { TextInput, Select } from '@/components/atoms';
import { QuestionContainer } from '../../../assets/styled/servey';

import { Question, QuestionType } from '@/types/survey';

import { palette } from '@/constants';

interface QuestionBoxProps {
  question: Question;
  onChange: (title: string, type: string, options: string) => void;
}

const QuestionBox = ({ question, onChange }: QuestionBoxProps) => {
  const [data, setData] = useState<Question>(question);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, title: e.target.value });
    },
    [data]
  );

  const handleChangeType = useCallback(
    (value: string) => {
      setData({ ...data, type: value as QuestionType });
    },
    [data]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <QuestionContainer>
      <TextInput
        value={data.title}
        placeholder="질문"
        fullWidth
        variant="standard"
        onChange={handleChangeTitle}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </QuestionContainer>
  );
};

export default QuestionBox;

const SelectWrapper = styled.div`
  width: 100%;
  margin-top: 12px;
`;
