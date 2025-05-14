'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

import { Button } from '@mui/material';
import { PageContent, PageHeader, PageLayout } from '@/assets/styled';

import { palette } from '@/constants';
import { SurveyTitleField } from '@/components/molecules/survey';
import { Question } from '@/types';


const SurveyCreatePage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/
  const handleAddQuestion = useCallback(() => {
    console.log('질문 추가');
  }, []);


  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);


  /*****************************************************************************
   * RENDER
   *****************************************************************************/
  return (
    <PageLayout>
      <PageHeader>템플릿 생성
        <Button variant="contained" color="primary" onClick={handleAddQuestion}>질문 추가</Button>
      </PageHeader>

      <PageContent>
        <SurveyTitleField onChange={handleTitleChange} />
      </PageContent>

    </PageLayout>
  );
};
export default SurveyCreatePage;

const TotalCount = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.gray900};
`;

const TableHeader = styled.div`
  width: 100%;
  padding: 8px 18px;
  height: 43px;
  position: relative;
`;


const TableContainer = styled.div`
  padding: 12px 0;
  position: relative;
  box-shadow:
    rgba(145, 158, 171, 0.2) 0 0 2px 0,
    rgba(145, 158, 171, 0.12) 0 12px 24px -4px;
  z-index: 0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-radius: 16px;
  background-color: ${palette.white};
  overflow-y: auto;



`;
