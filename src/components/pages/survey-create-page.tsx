'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import moment from 'moment';

import { Button, IconButton } from '@mui/material';
import { PageContent, PageHeader, PageLayout } from '@/assets/styled';

import useStorageHandler from '@/hooks/use-storage-handler';
import { useTempleteStore } from '@/stores/use-templete-store';

import { ModifyQuestionBox, ModifyTitleBox } from '@/components/molecules';
import { QuestionType } from '@/types/survey';

import { toast } from '@/utils';
import { palette } from '@/constants';

const SurveyCreatePage = () => {
  const router = useRouter();

  const { templete, createTemplete, changeSubject, changeDescription, addQuestion } = useTempleteStore();
  const { postServey } = useStorageHandler();

  useEffect(() => {
    createTemplete();
  }, [createTemplete]);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/
  const handleCreateSurvey = useCallback(() => {
    console.log('templete', templete);

    if (templete.subject === '') {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (templete.questions.some((question) => question.title === '')) {
      toast.error('질문을 입력해주세요.');
      return;
    }
    if (
      templete.questions.some((question) => question.type !== QuestionType.TEXTAREA && question.options.length === 0)
    ) {
      toast.error('옵션을 입력해주세요.');
      return;
    }

    const nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
    postServey({ ...templete, createdAt: nowDate, updatedAt: nowDate });
    toast.success('설문이 생성 되었습니다.');
    router.push('/survey');
  }, [templete]);

  const handleAddQuestion = useCallback(() => {
    addQuestion();
  }, []);

  const handleChangeHeader = useCallback(
    (title: string, description: string) => {
      changeSubject(title);
      changeDescription(description);
    },
    [changeSubject, changeDescription]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <PageLayout>
      <PageHeader>
        템플릿 생성
        <Button variant="contained" color="primary" onClick={handleCreateSurvey}>
          생성
        </Button>
      </PageHeader>

      <PageContent>
        <SurveyContainer>
          <ModifyTitleBox onChange={handleChangeHeader} />
          {templete.questions.map((question) => (
            <ModifyQuestionBox key={question.id} question={question} />
          ))}
        </SurveyContainer>
      </PageContent>
      <FloatingArea>
        <FloatingButton onClick={handleAddQuestion}>+</FloatingButton>
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.8;
    background-color: ${palette.main};
  }
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0 48px;
`;
