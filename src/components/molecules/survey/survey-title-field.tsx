
'use client';

import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { TextInput } from '@/components/atoms';
import { palette } from '@/constants';

interface SurveyTitleFieldProps {
    defaultTitle?: string;
    defaultDesc?: string;
    onChange: (title: string, description: string) => void;
}

const SurveyTitleField = ({ defaultTitle, defaultDesc, onChange }: SurveyTitleFieldProps) => {
    const [title, setTitle] = useState<string>(defaultTitle || '');
    const [description, setDescription] = useState<string>(defaultDesc || '');

    /*****************************************************************************
     * ACTION
     *****************************************************************************/

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        onChange(e.target.value, description);
    }, [onChange, description]);

    const handleChangeDescription = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        onChange(title, e.target.value);
    }, [onChange, title]);

    /*****************************************************************************
     * RENDER
     *****************************************************************************/

    return (
        <TitleContainer>
            <StyledTextInput
                value={title}
                placeholder="제목 없는 설문지"
                fullWidth
                variant="standard"
                onChange={handleChangeTitle}
                InputProps={{
                    disableUnderline: true
                }}
            />
            <StyledDescription
                value={description}
                placeholder="설문지 설명"
                fullWidth
                multiline
                variant="standard"
                onChange={handleChangeDescription}
                InputProps={{
                    disableUnderline: true
                }}
            />

        </TitleContainer>
    );
};

export default SurveyTitleField;


const TitleContainer = styled.div`
  padding: 24px 24px 12px;
  background-color: ${palette.white};
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;
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
