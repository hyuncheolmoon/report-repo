'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';
import moment from 'moment';

import { Button } from '@mui/material';
import { FullPageLayout, PageContent, PageHeader, BackButton, RightBtnGroup, Loading } from '@/assets/styled';

import { usePathHandler, useStorageHandler } from '@/hooks';
import { useTempleteStore } from '@/stores/use-templete-store';

import { SurveyTemplete } from '@/components/templete';

import { toast } from '@/utils';

const SurveyDetailPage = () => {
  const router = useRouter();
  const { templete, setTemplete, reset } = useTempleteStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setIsLoading(false);
      return;
    }
    setTemplete(survey);
    setIsLoading(false);
  }, [setTemplete, surveyId, getServey, getTempServey, router, path]);

  useEffect(() => {
    getData();
  }, []);

  /**
   * 템플릿 변경 감지 후 임시저지
   */
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
  /**
   * 현재 상태의 컴포넌트 저장
   */
  const handleSaveSurvey = useCallback(() => {
    if (templete.subject === '') {
      toast.error('설문지의 제목을 입력해주세요.');
      const subjectInput = document.getElementById('survey-subject');
      if (subjectInput) {
        subjectInput.focus();
      }
      return;
    }

    for (const question of templete.questions) {
      if (question.title === '') {
        toast.error('질문의 내용을 입력해주세요.');
        const titleInput = document.getElementById(`question-title-${question.id}`);
        if (titleInput) {
          titleInput.focus();
        }
        return;
      }
    }

    const nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
    updateServey({ ...templete, id: surveyId as string, updatedAt: nowDate });
    toast.success('설문이 수정 되었습니다.');
    deleteTempServey();
    router.push('/survey');
    reset();
  }, [templete, deleteTempServey, reset, router, surveyId, updateServey]);

  /**
   * 템플릿 리스트 페이지로 이동(뒤로가기)
   */
  const handleMoveSurveyPage = useCallback(() => {
    deleteTempServey();
    router.replace(path.main);
  }, [deleteTempServey, router, path]);

  /**
   * 미리보기 페이지로 이동
   */
  const handleMovePreviewPage = useCallback(() => {
    postTempServey(templete);
    router.replace(`${path.preview}`);
  }, [templete, router, path, postTempServey]);

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
          <Button variant="contained" color="primary" onClick={handleMovePreviewPage} disabled={isLoading}>
            미리보기
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveSurvey} disabled={isLoading}>
            저장
          </Button>
        </RightBtnGroup>
      </PageHeader>

      <PageContent>
        <PageContent>{isLoading ? <Loading /> : <SurveyTemplete />}</PageContent>
      </PageContent>
    </FullPageLayout>
  );
};
export default SurveyDetailPage;
