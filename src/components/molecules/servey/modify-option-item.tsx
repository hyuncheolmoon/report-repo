'use client';

import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { RiCheckboxBlankCircleLine, RiCloseCircleLine } from 'react-icons/ri';

import { Button } from '@mui/material';
import { TextInput } from '@/components/atoms';

import { useTempleteStore } from '@/stores/use-templete-store';

import { QuestionType, OptionItem, Question } from '@/types/survey';
import { generateUUID, toast } from '@/utils';
import { palette } from '@/constants';
type ModifyOptionItemProps = {
  question: Question;
};

const ModifyOptionItem = ({ question }: ModifyOptionItemProps) => {
  const { changeQuestion } = useTempleteStore();
  /*****************************************************************************
   * ACTION / EVENT
   *****************************************************************************/

  /**
   * 옵션 추가
   */
  const handleAddOptionItem = useCallback(() => {
    changeQuestion({
      ...question,
      options: [...question.options, { id: generateUUID(), content: `옵션 ${question.options.length + 1}` }],
    });
  }, [question, changeQuestion]);

  const handleRemoveItem = useCallback(
    (id: string) => {
      if (question.options.length === 1) {
        toast.error('하나 이상의 옵션이 필요합니다.');
        return;
      }
      changeQuestion({ ...question, options: question.options.filter((o) => o.id !== id) });
    },
    [question, changeQuestion]
  );

  /**
   * 옵션 내용 변경
   */
  const handleChangeContent = useCallback(
    (event: React.FocusEvent<HTMLInputElement>, id: string, index: number) => {
      const content = event.target.value || `옵션 ${index + 1}`;
      if (!event.target.value) {
        event.target.value = content;
      }
      changeQuestion({
        ...question,
        options: question.options.map((o) => (o.id === id ? { ...o, content: content.trim() } : o)),
      });
    },
    [question, changeQuestion]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const renderItem = useCallback(
    (item: OptionItem, index: number) => (
      <ListItem key={item.id} data-testid={`option-item-${index}`}>
        <ItemDivison>
          {question.type === QuestionType.CHECKBOX && <RiCheckboxBlankCircleLine />}
          {question.type === QuestionType.DROPDOWN && index + 1}
        </ItemDivison>
        <ItemText>
          <TextInput
            defaultValue={item.content}
            fullWidth
            placeholder="내용을 입력하세요"
            variant="filled"
            onBlur={(event) => handleChangeContent(event as React.FocusEvent<HTMLInputElement>, item.id, index)}
          />
          <DeleteBtn onClick={() => handleRemoveItem(item.id)}>
            <RiCloseCircleLine />
          </DeleteBtn>
        </ItemText>
      </ListItem>
    ),
    [question, handleChangeContent, handleRemoveItem]
  );

  return (
    <ListContainer>
      <ItemsList>
        {question.options.map(renderItem)}
        <AddBtnbox>
          <Button onClick={handleAddOptionItem}>옵션 추가</Button>
        </AddBtnbox>
      </ItemsList>
    </ListContainer>
  );
};

export default ModifyOptionItem;

const ItemDivison = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  padding: 20px;
`;

const DeleteBtn = styled(Button)`
  font-size: 18px;
  color: ${palette.red200};
`;
const ItemText = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddBtnbox = styled.div`
  text-align: left;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
