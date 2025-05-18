'use client';

import React, { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';

import { Button, FormControlLabel, SelectChangeEvent } from '@mui/material';
import { TextInput, Select, Checkbox } from '@/components/atoms';
import { QuestionItemBox, QuestionContents, QuestionHeader } from '@/assets/styled/servey';

import { Question, QuestionType, QuestionTypeLabel, OptionItem } from '@/types';
import { useConfirmDialog } from '@/contexts/confirm-context';

import ModifyOptionItem from './modify-option-item';

import { palette } from '@/constants';
import { generateUUID } from '@/utils';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useTempleteStore } from '@/stores/use-templete-store';

import { toast } from '@/utils';

type QuestionBoxProps = {
  question: Question;
};

const QuestionBox = ({ question }: QuestionBoxProps) => {
  const { templete, changeQuestion, deleteQuestion } = useTempleteStore();
  const { confirm } = useConfirmDialog();

  /**
   * 타입 리스트
   */
  const typeList = useMemo(() => {
    return Object.values(QuestionType).map((type) => ({
      label: QuestionTypeLabel[type],
      value: type,
    }));
  }, []);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/
  /**
   * 첫번째 새로운 옵션 생성 및 반환
   */
  const getNewOptions: (data: Question) => OptionItem[] = useCallback((data) => {
    const newOptions = data.options.length > 0 ? data.options : [{ id: generateUUID(), content: `옵션 1` }];
    return newOptions;
  }, []);

  /**
   * 질문 제목 변경
   */
  const handleChangeTitle = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const title = e.target.value ?? '';
      const newData = { ...question, title: title.trim() };
      changeQuestion(newData);
    },
    [question, changeQuestion]
  );

  //const handleCheckValidTitle = useCallback(
  //  (e: React.ChangeEvent<HTMLInputElement>) => {
  //    const title = e.target.value ?? '';
  //    if (title.length >= 80) {
  //      toast.error('설문지 제목은 80자 이하로 입력해주세요.');
  //      return;
  //    }
  //  },
  //  [question, changeQuestion]
  //);

  /**
   * 질문 타입 변경
   */
  const handleChangeType = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const selectedType = event.target.value as QuestionType;
      const isTextType = selectedType === QuestionType.TEXTAREA;
      const newOptions = isTextType ? [] : getNewOptions(question);
      const newData = { ...question, type: selectedType, options: newOptions };
      changeQuestion(newData);
    },
    [question, getNewOptions, changeQuestion]
  );

  /**
   * 필수 여부 변경
   */
  const handleChangeRequired = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData = { ...question, required: e.target.checked };
      changeQuestion(newData);
    },
    [question, changeQuestion]
  );

  /**
   * 질문 삭제
   */
  const handleDeleteQuestion = useCallback(async () => {
    if (templete.questions.length === 1) {
      toast.error('한가지 이상의 질문이 필요합니다.');
      return;
    }
    const isConfirmed = await confirm('삭제하시겠습니까?');
    if (!isConfirmed) {
      return;
    }
    deleteQuestion(question.id);
  }, [templete, question, deleteQuestion, confirm]);

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const RenderTypeItem = useMemo(() => {
    switch (question.type) {
      case QuestionType.TEXTAREA:
        return (
          <QuestionContents>
            <TextInput placeholder="입력가능한 텍스트형" fullWidth disabled />
          </QuestionContents>
        );
      case QuestionType.DROPDOWN:
      case QuestionType.CHECKBOX:
        return <ModifyOptionItem question={question} />;
    }
  }, [question]);

  return (
    <QuestionItemBox id={`question-${question.id}`}>
      <QuestionHeader>
        <TitleInputBox>
          <TextInput
            data-testid={`question-title-${question.id}`}
            id={`question-title-${question.id}`}
            defaultValue={question.title}
            placeholder="질문"
            fullWidth
            onBlur={handleChangeTitle}
          />
        </TitleInputBox>

        <SelectTypeWrapper>
          <Select
            data-testid={`question-type-${question.id}`}
            value={question.type}
            onChange={handleChangeType}
            fullWidth
            options={typeList}
          />
        </SelectTypeWrapper>
      </QuestionHeader>
      <OptionsWrapper>{RenderTypeItem}</OptionsWrapper>
      <QuestionFooter>
        <RequiredBox data-testid={`question-required-${question.id}`}>
          <FormControlLabel
            control={
              <Checkbox
                checked={question.required}
                onChange={handleChangeRequired}
                value={question.required ? 'true' : 'false'}
              />
            }
            label="필수 질문"
            labelPlacement="end"
          />
        </RequiredBox>
        <DeleteBtn data-testid={`question-delete-${question.id}`} onClick={handleDeleteQuestion}>
          <RiDeleteBinLine fontSize={22} /> <div>삭제</div>
        </DeleteBtn>
      </QuestionFooter>
    </QuestionItemBox>
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
  color: ${palette.red200};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
`;

const TitleInputBox = styled.div`
  flex: 1 1 auto;
`;
const SelectTypeWrapper = styled.div`
  flex-grow: 0;
  width: 200px;
`;
