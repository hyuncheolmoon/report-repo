'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

import { Button, IconButton } from '@mui/material';
import { PageContent, PageHeader, PageLayout } from '@/assets/styled';

import { palette } from '@/constants';
import { Question, QuestionType } from '@/types';

import { ModifyQuestionBox, ModifyTitleBox } from '@/components/molecules';
import { generateUUID } from '@/utils';

const defaultData = {
  id: '',
  title: '',
  type: QuestionType.TEXTAREA,
  options: [],
  text: '',
  required: false
}

const SurveyCreatePage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question<string>[]>([]);

  useEffect(() => {
    handleAddQuestion();
  }, []);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/
  const handleAddQuestion = useCallback(() => {
    const newQuestion = { ...defaultData, id: generateUUID() };
    setQuestions([...questions, newQuestion]);
  }, [questions]);


  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);



  /*****************************************************************************
   * RENDER
   *****************************************************************************/
  const RenderQuestions = useMemo(() => {
    return questions.map((question) => {
      return <ModifyQuestionBox key={question.id} question={question} />;
    });
  }, [questions]);

  return (
    <PageLayout>
      <PageHeader>템플릿 생성
        <Button variant="contained" color="primary" onClick={handleAddQuestion}>질문 추가</Button>
      </PageHeader>

      <PageContent>
        <SurveyContainer>
          <ModifyTitleBox onChange={handleTitleChange} />
          {RenderQuestions}
        </SurveyContainer>
      </PageContent>
      <FloatingArea>
        <FloatingButton
          onClick={handleAddQuestion}
        >
          +
        </FloatingButton>
      </FloatingArea>


    </PageLayout>
  );
};
export default SurveyCreatePage;

const FloatingArea = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;

`;


const FloatingButton = styled(IconButton)`
  width: 56px;
  height: 56px;
  background-color: ${palette.main};
  color: ${palette.white};
  font-size: 29px;
  border-radius: 50%;
  min-width: unset;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);

  &:hover {
    opacity: 0.8;
    background-color: ${palette.main};
  }
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
