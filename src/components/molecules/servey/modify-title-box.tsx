'use client';

import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import { TextInput } from '@/components/atoms';

import { QuestionItemBox } from '@/assets/styled/servey';

import { palette } from '@/constants';

type ModifyTitleBoxProps = {
  subject?: string;
  description?: string;
  onChange: (subject: string, description: string) => void;
};

const ModifyTitleBox = ({ subject, description, onChange }: ModifyTitleBoxProps) => {
  /*****************************************************************************
   * ACTION
   *****************************************************************************/

  /**
   * 제목 변경
   */
  const handleChangeTitle = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value ?? '';
      onChange(value.trim(), description ?? '');
    },
    [onChange, description]
  );

  /**
   * 설명 변경
   */
  const handleChangeDescription = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value ?? '';
      onChange(subject ?? '', value.trim());
    },
    [onChange, subject]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <QuestionItemBox>
      <TitleTextInput
        data-testid="survey-subject"
        id="survey-subject"
        defaultValue={subject}
        placeholder="제목 없는 설문지"
        fullWidth
        variant="standard"
        onBlur={handleChangeTitle}
      />
      <DescTextInput
        data-testid="survey-description"
        defaultValue={description}
        placeholder="설문지 설명"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        onBlur={handleChangeDescription}
      />
    </QuestionItemBox>
  );
};

export default ModifyTitleBox;

const TitleTextInput = styled(TextInput)`
  .MuiInputBase-input {
    font-size: 28px;
    font-weight: 400;
    color: ${palette.gray900};
    padding: 8px 0;

    &::placeholder {
      color: ${palette.gray500};
    }
  }
`;

const DescTextInput = styled(TextInput)`
  .MuiInputBase-input {
    font-size: 14px;
    font-weight: 400;
    color: ${palette.gray700};
    padding: 4px 0;

    &::placeholder {
      color: ${palette.gray400};
    }
  }
`;
