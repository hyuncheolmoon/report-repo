'use client';

import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import { TextInput, Select } from '@/components/atoms';
import { QuestionItemBox, QuestionContents, QuestionHeader, Required } from '@/assets/styled/servey';

import { Question, QuestionType } from '@/types';

import ViewOptionItem from './view-option-item';

import { palette } from '@/constants';

type QuestionBoxProps = {
  question: Question;
};

const ViewQuestionBox = ({ question }: QuestionBoxProps) => {
  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const RenderTypeItem = useMemo(() => {
    switch (question.type) {
      case QuestionType.TEXTAREA:
        return (
          <QuestionContents>
            <TextInput placeholder="답변을 입력해주세요" fullWidth />
          </QuestionContents>
        );
      case QuestionType.DROPDOWN:
        return (
          <DropdownBox
            defaultValue={question.options[0].id}
            options={question.options.map((item) => ({
              label: item.content,
              value: item.id,
            }))}
          />
        );
      case QuestionType.CHECKBOX:
        return <ViewOptionItem question={question} />;
    }
  }, [question]);

  return (
    <QuestionItemBox id={`question-${question.id}`}>
      <QuestionHeader>
        <TitleWrapper>
          {question.title}
          {question.required && <Required />}
        </TitleWrapper>
      </QuestionHeader>
      <OptionsWrapper>{RenderTypeItem}</OptionsWrapper>
    </QuestionItemBox>
  );
};

export default ViewQuestionBox;

const OptionsWrapper = styled.div`
  padding: 8px 0 12px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleWrapper = styled.div`
  flex: 1 1 auto;
  font-size: 18px;
  font-weight: 700;
  color: ${palette.gray900};
`;

const DropdownBox = styled(Select)`
  min-width: 200px;
  width: fit-content;
  max-width: 100%;
`;
