'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import moment from 'moment';

import { Button } from '@mui/material';
import {
  FullPageLayout,
  PageContent,
  PageHeader,
  ContentLayer,
  SurveyContainer,
  FloatingArea,
  FloatingButton,
  BackButton,
  RightBtnGroup,
} from '@/assets/styled';

import useStorageHandler from '@/hooks/use-storage-handler';
import { useTempleteStore } from '@/stores/use-templete-store';

import { ModifyQuestionBox, ModifyTitleBox } from '@/components/molecules';

import { toast } from '@/utils';
import { usePathHandler } from '@/hooks';
import { RiArrowLeftLine } from 'react-icons/ri';

const SurveyDetailPage = () => {
  const router = useRouter();
  const { templete, setTemplete, changeSubject, addQuestion, reset } = useTempleteStore();

  const { surveyId } = useParams();

  const { updateServey, getServey, postTempServey, getTempServey, deleteTempServey } = useStorageHandler();
  const { path } = usePathHandler();

  const getData = useCallback(() => {
    const survey = getServey(surveyId as string);
    if (!survey) {
      toast.error('설문이 존재하지 않습니다.');
      router.push(path.main);
      return;
    }
    const temp = getTempServey();
    // 미리보기 후 복귀했을때 수정본 유지를 위한 코드
    if (temp && temp.id && temp.id === surveyId) {
      setTemplete(temp);
      return;
    }
    setTemplete(survey);
  }, [setTemplete, surveyId, deleteTempServey]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsub = useTempleteStore.subscribe(
      (state) => state.templete,
      (newTemplete) => postTempServey(newTemplete)
    );

    return () => unsub();
  }, []);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/
  const handleSaveSurvey = useCallback(() => {
    if (templete.subject === '') {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (templete.questions.some((question) => question.title === '')) {
      toast.error('질문을 입력해주세요.');
      return;
    }

    const nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
    updateServey({ ...templete, id: surveyId as string, updatedAt: nowDate });
    toast.success('설문이 수정 되었습니다.');
    deleteTempServey();
    reset();
    router.push('/survey');
  }, [templete, deleteTempServey, reset, router, path]);

  const handleMoveSurveyPage = useCallback(() => {
    deleteTempServey();
    router.replace(path.main);
  }, [deleteTempServey, router, path]);

  const handleMovePreviewPage = useCallback(() => {
    postTempServey(templete);
    router.replace(`${path.preview}`);
  }, [templete]);

  const handleAddQuestion = useCallback(() => {
    const newData = addQuestion();
    setTimeout(() => {
      const questionElement = document.getElementById(`question-${newData.id}`);
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const handleChangeHeader = useCallback(
    (title: string, description: string) => {
      changeSubject(title, description);
    },
    [changeSubject]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  if (!templete) {
    return null;
  }

  return (
    <FullPageLayout>
      <PageHeader>
        <BackButton variant="text" color="primary" onClick={handleMoveSurveyPage}>
          <RiArrowLeftLine />
          템플릿 상세 
        </BackButton>
        <RightBtnGroup>
          <Button variant="contained" color="primary" onClick={handleMovePreviewPage}>
            미리보기
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveSurvey}>
            저장
          </Button>
        </RightBtnGroup>
      </PageHeader>

      <PageContent>
        <SurveyContainer>
          <ContentLayer>
            <ModifyTitleBox
              subject={templete.subject}
              description={templete.description}
              onChange={handleChangeHeader}
            />
            {templete.questions.map((question) => (
              <ModifyQuestionBox key={question.id} question={question} />
            ))}
          </ContentLayer>
        </SurveyContainer>
      </PageContent>

      <FloatingArea>
        <FloatingButton onClick={handleAddQuestion}>+</FloatingButton>
      </FloatingArea>
    </FullPageLayout>
  );
};
export default SurveyDetailPage;
