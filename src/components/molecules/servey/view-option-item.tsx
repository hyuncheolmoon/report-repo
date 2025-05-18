'use client';

import React from 'react';
import styled from '@emotion/styled';

import { Checkbox, FormControlLabel } from '@mui/material';

import { OptionItem, Question } from '@/types';

type ViewOptionItemProps = {
  question: Question;
};

const ViewOptionItem = ({ question }: ViewOptionItemProps) => {
  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <ListContainer>
      <ItemsList>
        {question.options.map((item: OptionItem) => (
          <ListItem key={item.id}>
            <FormControlLabel control={<Checkbox name={item.id} />} label={item.content} />
          </ListItem>
        ))}
      </ItemsList>
    </ListContainer>
  );
};

export default ViewOptionItem;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
