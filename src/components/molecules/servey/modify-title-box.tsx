'use client';

import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { TextInput } from '@/components/atoms';
import { palette } from '@/constants';
import { QuestionContainer } from '../../../assets/styled/servey';

type ModifyTitleBoxProps = {
  subject?: string;
  description?: string;
  onChange: (subject: string, description: string) => void;
};

const ModifyTitleBox = ({ subject, description, onChange }: ModifyTitleBoxProps) => {
  /*****************************************************************************
   * ACTION
   *****************************************************************************/

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(description);
      onChange(e.target.value, description || '');
    },
    [onChange, description]
  );

  const handleChangeDescription = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(subject);
      onChange(subject || '', e.target.value);
    },
    [onChange, subject]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <QuestionContainer>
      <StyledTextInput
        value={subject}
        placeholder="제목 없는 설문지"
        fullWidth
        variant="standard"
        onChange={handleChangeTitle}
      />
      <StyledDescription
        value={description}
        placeholder="설문지 설명"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        onChange={handleChangeDescription}
      />
    </QuestionContainer>
  );
};

export default ModifyTitleBox;

const StyledTextInput = styled(TextInput)`
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

const StyledDescription = styled(TextInput)`
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
