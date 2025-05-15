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
import { useTempleteStore } from '@/stores/use-templete-store';

type QuestionBoxProps = {
    question: Question
    // onChange?: (question: Question) => void;
    // onDelete?: (id: string) => void;
}


const QuestionBox = ({ question }: QuestionBoxProps) => {

    const { changeQuestion, deleteQuestion } = useTempleteStore();


    const typeList = useMemo(() => {
        return Object.values(QuestionType).map((type) => ({
            label: QuestionTypeLabel[type],
            value: type
        }));
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
    /**
     * 옵션 데이터 조회
     */
    const getNewOptions: (data: Question) => OptionItem[] = useCallback((data) => {
        const newOptions = data.options.length > 0 ? data.options : [{ ...defaultItem, id: generateUUID() }];
        return newOptions;
    }, []);

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = { ...question, title: e.target.value };
        changeQuestion(newData);
    }, [question, changeQuestion]);

    const handleChangeType = useCallback((event: SelectChangeEvent<unknown>) => {
        const selectedType = event.target.value as QuestionType;
        const isTextType = selectedType === QuestionType.TEXTAREA;
        const newOptions = isTextType ? [] : getNewOptions(question);
        const newData = { ...question, type: selectedType, options: newOptions };
        changeQuestion(newData);
    }, [question, getNewOptions, changeQuestion]);

    const handleChangeRequired = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = { ...question, required: e.target.checked };
        changeQuestion(newData);
    }, [question, changeQuestion]);


    const handleDeleteQuestion = useCallback(() => {
        deleteQuestion(question.id);
    }, [question, deleteQuestion]);

    /*****************************************************************************
     * RENDER
     *****************************************************************************/

    const RenderTypeItem = useMemo(() => {
        switch (question.type) {
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
                    <ListItem question={question} />
                );
        }
    }, [question]);


    return (
        <QuestionContainer>
            <QuestionHeader>
                <TitleWrapper>
                    <TextInput
                        value={question.title}
                        placeholder="질문"
                        fullWidth
                        onChange={handleChangeTitle}
                    />
                </TitleWrapper>

                <SelectTypeWrapper>
                    <Select
                        value={question.type}
                        onChange={handleChangeType}
                        fullWidth
                        options={typeList}
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

