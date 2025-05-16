'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { RiCheckboxBlankCircleLine, RiCloseCircleLine } from 'react-icons/ri';
import { QuestionType, OptionItem, Question } from '@/types/survey';
import { generateUUID, toast } from '@/utils';
import { TextInput } from '@/components/atoms';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { palette } from '@/constants';
import { useTempleteStore } from '@/stores/use-templete-store';

type ModifyOptionItemProps = {
  question: Question;
};

const ModifyOptionItem = ({ question }: ModifyOptionItemProps) => {
  const { changeQuestion } = useTempleteStore();
  /*****************************************************************************
   * ACTION / EVENT
   *****************************************************************************/

  const handleAddItem = useCallback(() => {
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

  const handleChangeContent = useCallback(
    (id: string, value: string) => {
      const content = value.trim();
      changeQuestion({
        ...question,
        options: question.options.map((o) => (o.id === id ? { ...o, content } : o)),
      });
    },
    [question, changeQuestion]
  );

  const handleCheckContent = useCallback(
    (id: string, value: string, index: number) => {
      const content = value.trim();
      if (content === '') {
        handleChangeContent(id, `옵션 ${index + 1}`);
      }
    },
    [question, changeQuestion]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const renderItem = useCallback(
    (item: OptionItem, index: number) => (
      <ListItem key={item.id}>
        <ItemDivison>
          {question.type === QuestionType.CHECKBOX && <RiCheckboxBlankCircleLine />}
          {question.type === QuestionType.DROPDOWN && index + 1}
        </ItemDivison>
        <ItemText>
          <TextInput
            value={item.content}
            fullWidth
            placeholder="내용을 입력하세요"
            variant="filled"
            onChange={(e) => handleChangeContent(item.id, e.target.value)}
            onBlur={(e) => handleCheckContent(item.id, e.target.value, index)}
          />
          <DeleteBtn onClick={() => handleRemoveItem(item.id)}>
            <RiCloseCircleLine />
          </DeleteBtn>
        </ItemText>
      </ListItem>
    ),
    [handleChangeContent, handleRemoveItem]
  );

  return (
    <ListContainer>
      <ItemsList>
        {question.options.map(renderItem)}
        <AddBtnbox>
          <Button onClick={handleAddItem}>옵션 추가</Button>
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
