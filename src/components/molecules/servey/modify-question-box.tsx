'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

import { SelectChangeEvent } from '@mui/material';
import { TextInput, Select, Checkbox } from '@/components/atoms';
import { QuestionContainer, QuestionContents, QuestionHeader } from '../../../assets/styled/servey';

import { Question, QuestionType, QuestionTypeLabel } from '@/types/survey';

import ListItem, { Items } from './list-item';


import { palette } from '@/constants';


interface QuestionBoxProps<T> {
    question: Question<T>
    onChange?: (title: string, type: string, options: string) => void;
}


const QuestionBox = <T,>({ question, onChange }: QuestionBoxProps<T>) => {
    const [data, setData] = useState<Question<T>>(question);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const typeOptions = useMemo(() => {
        return Object.values(QuestionType).map((type) => ({
            label: QuestionTypeLabel[type],
            value: type
        }));
    }, []);

    /*****************************************************************************
     * ACTION
     *****************************************************************************/

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, title: e.target.value });
    }, [data]);

    const handleChangeType = useCallback((event: SelectChangeEvent<unknown>) => {
        setData({ ...data, type: event.target.value as QuestionType });
    }, [data]);

    /*****************************************************************************
     * RENDER
     *****************************************************************************/

    const RenderTypeItem = useMemo(() => {
        switch (data.type) {
            case QuestionType.TEXTAREA:
                return (
                    <QuestionContents>
                        <TextInput
                            placeholder="입력가능한 텍스트형"
                            fullWidth
                            disabled
                        />
                    </QuestionContents>
                );
            case QuestionType.DROPDOWN:
            case QuestionType.CHECKBOX:
                return (
                    <ListItem type={data.type} items={data.options as Items[]} />
                );
        }
    }, [data]);


    return (
        <QuestionContainer>
            <QuestionHeader>
                <TitleWrapper>
                    <TextInput
                        value={data.title}
                        placeholder="질문"
                        fullWidth
                        onChange={handleChangeTitle}
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                </TitleWrapper>

                <SelectTypeWrapper>
                    <Select
                        value={data.type}
                        onChange={handleChangeType}
                        fullWidth
                        options={typeOptions}
                    />
                </SelectTypeWrapper>
            </QuestionHeader>
            <OptionsWrapper>
                {RenderTypeItem}
            </OptionsWrapper>


        </QuestionContainer>
    );
};

export default QuestionBox;

const OptionsWrapper = styled.div`
  padding: 12px 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

`;

const TitleWrapper = styled.div`
  flex: 1 1 auto;

`;
const SelectTypeWrapper = styled.div`
  flex-grow: 0;
  width: 200px;
`;

