'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';

import { RiArrowLeftLine } from 'react-icons/ri';

import { Button } from '@mui/material';
import { FullPageLayout, PageContent, PageHeader, BackButton, RightBtnGroup, Loading } from '@/assets/styled';

import { usePathHandler } from '@/hooks';
import useStorageHandler from '@/hooks/use-storage-handler';
import { useTempleteStore } from '@/stores/use-templete-store';

import { toast, generateUUID } from '@/utils';
import { SurveyTemplete } from '../templete';

const SurveyCreatePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { templete, setTemplete, createTemplete, reset } = useTempleteStore();
  const { postServey, getTempServey, postTempServey } = useStorageHandler();
  const { path } = usePathHandler();

  const setInitData = useCallback(() => {
    const temp = getTempServey();
    // 미리보기 후 복귀했을때 수정본 유지를 위한 코드
    if (temp && !temp.id) {
      setTemplete(temp);
      setIsLoading(false);
      return;
    }
    createTemplete();
    setIsLoading(false);
  }, [createTemplete, getTempServey, setTemplete]);

  useEffect(() => {
    setInitData();
  }, []);

  /**
   * 템플릿 변경 감지 후 임시저지
   */
  useEffect(() => {
    const unsub = useTempleteStore.subscribe(
      (state) => state.templete,
      (newTemplete) => {
        console.log('newTemplete', newTemplete);
        postTempServey(newTemplete);
      }
    );
    return () => unsub();
  }, []);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/
  /**
   * 설문 생성
   */
  const handleCreateSurvey = useCallback(() => {
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
    postServey({ ...templete, id: generateUUID(), createdAt: nowDate, updatedAt: nowDate });
    toast.success('설문이 생성 되었습니다.');
    router.push('/survey');
    reset();
  }, [templete, router, reset, postServey]);

  /**
   * 미리보기 페이지로 이동
   */
  const handleMovePreviewPage = useCallback(() => {
    postTempServey(templete);
    router.replace(`${path.preview}`);
  }, [templete, router, path, postTempServey]);

  const handleMoveSurveyPage = useCallback(() => {
    router.replace(path.main);
  }, [router, path]);

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <FullPageLayout>
      <PageHeader>
        <BackButton variant="text" color="primary" onClick={handleMoveSurveyPage}>
          <RiArrowLeftLine />
          템플릿 생성
        </BackButton>

        <RightBtnGroup>
          <Button variant="contained" color="primary" onClick={handleMovePreviewPage} disabled={isLoading}>
            미리보기
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreateSurvey} disabled={isLoading}>
            저장
          </Button>
        </RightBtnGroup>
      </PageHeader>

      <PageContent>{isLoading ? <Loading /> : <SurveyTemplete />}</PageContent>
    </FullPageLayout>
  );
};
export default SurveyCreatePage;
