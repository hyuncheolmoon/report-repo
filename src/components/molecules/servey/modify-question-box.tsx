'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

import { Button, SelectChangeEvent, Switch } from '@mui/material';
import { TextInput, Select, Checkbox } from '@/components/atoms';
import { QuestionContainer, QuestionContents, QuestionHeader } from '../../../assets/styled/servey';

import { Question, QuestionType, QuestionTypeLabel, OptionItem } from '@/types/survey';

import ListItem, { defaultItem } from './modify-option-item';


import { palette } from '@/constants';
import { generateUUID } from '@/utils';
import { RiDeleteBinLine } from 'react-icons/ri';


type QuestionBoxProps<T> = {
    question: Question<T>
    onChange?: (question: Question<T>) => void;
    onDelete?: (id: string) => void;
}


const QuestionBox = <T,>({ question, onChange, onDelete }: QuestionBoxProps<T>) => {
    const [questionData, setQuestionData] = useState<Question<T>>(question);

    useEffect(() => {
        onChange?.(questionData);
    }, [questionData]);

    const typeOptions = useMemo(() => {
        return Object.values(QuestionType).map((type) => ({
            label: QuestionTypeLabel[type],
            value: type
        }));
    }, []);


    const getOptionData: (data: Question<T>) => OptionItem[] = useCallback((data) => {
        const newOptions = data.options.length > 0 ? data.options : [{ ...defaultItem, id: generateUUID() }];
        return newOptions;
    }, []);

    //useEffect(() => {
    //    if (questionData.type === QuestionType.TEXTAREA) {
    //        setQuestionData({ ...questionData, options: [] });
    //    } else {
    //        setQuestionData({ ...questionData, options: getOptionData(questionData) });
    //    }
    //}, [questionData.type]);


    /*****************************************************************************
     * ACTION
     *****************************************************************************/

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionData({ ...questionData, title: e.target.value });
    }, [questionData]);

    const handleChangeType = useCallback((event: SelectChangeEvent<unknown>) => {
        const selectedType = event.target.value as QuestionType;
        const isTextType = selectedType === QuestionType.TEXTAREA;
        const newOptions = isTextType ? [] : getOptionData(questionData);
        const newData = { ...questionData, type: selectedType, options: newOptions };
        console.log(newData)
        setQuestionData({ ...newData } as Question<T>);
    }, [questionData]);

    const handleChangeRequired = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleChangeRequired', e.target.checked)
        setQuestionData({ ...questionData, required: e.target.checked });
    }, [questionData]);

    const handleChangeOptions = useCallback((items: OptionItem[]) => {
        setQuestionData({ ...questionData, options: items });
    }, [questionData]);

    const handleDeleteQuestion = useCallback(() => {
        onDelete?.(questionData.id);
    }, [questionData]);

    /*****************************************************************************
     * RENDER
     *****************************************************************************/

    const RenderTypeItem = useMemo(() => {
        switch (questionData.type) {
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
                    <ListItem type={questionData.type} options={questionData.options as OptionItem[]} onChange={handleChangeOptions} />
                );
        }
    }, [questionData]);


    return (
        <QuestionContainer>
            <QuestionHeader>
                <TitleWrapper>
                    <TextInput
                        value={questionData.title}
                        placeholder="질문"
                        fullWidth
                        onChange={handleChangeTitle}
                    />
                </TitleWrapper>

                <SelectTypeWrapper>
                    <Select
                        value={questionData.type}
                        onChange={handleChangeType}
                        fullWidth
                        options={typeOptions}
                    />
                </SelectTypeWrapper>
            </QuestionHeader>
            <OptionsWrapper>
                {RenderTypeItem}
            </OptionsWrapper>
            <QuestionFooter>
                <RequiredBox>
                    <span>필수</span>
                    <Switch onChange={handleChangeRequired} />
                </RequiredBox>
                <DeleteBtn onClick={handleDeleteQuestion}><RiDeleteBinLine /></DeleteBtn>
            </QuestionFooter>


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

const QuestionFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const RequiredBox = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteBtn = styled(Button)`
  font-size: 18px;
  color: ${palette.red200};
`;

const TitleWrapper = styled.div`
  flex: 1 1 auto;

`;
const SelectTypeWrapper = styled.div`
  flex-grow: 0;
  width: 200px;
`;

