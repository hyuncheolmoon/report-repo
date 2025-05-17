'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';

import { RiArrowLeftLine } from 'react-icons/ri';
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

import { usePathHandler } from '@/hooks';
import useStorageHandler from '@/hooks/use-storage-handler';
import { useTempleteStore } from '@/stores/use-templete-store';

import { ModifyQuestionBox, ModifyTitleBox } from '@/components/molecules';

import { toast, generateUUID } from '@/utils';

const SurveyCreatePage = () => {
  const router = useRouter();
  const { templete, setTemplete, createTemplete, changeSubject, addQuestion, reset } = useTempleteStore();
  const { postServey, getTempServey, postTempServey } = useStorageHandler();
  const { path } = usePathHandler();

  const setInitData = useCallback(() => {
    const temp = getTempServey();
    console.log('temp', temp);
    // 미리보기 후 복귀했을때 수정본 유지를 위한 코드
    if (temp && !temp.id) {
      setTemplete(temp);
      return;
    }
    createTemplete();
  }, [createTemplete, getTempServey, setTemplete]);

  useEffect(() => {
    setInitData();
  }, [setInitData]);

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
    console.log('templete', templete);

    if (templete.subject === '') {
      toast.error('제목을 입력해주세요.');
      const titleInput = document.getElementsByName('survey-subject');
      if (titleInput?.[0]) {
        titleInput[0].focus();
      }
      return;
    }

    for (const question of templete.questions) {
      if (question.title === '') {
        toast.error('질문을 입력해주세요.');
        const titleInput = document.getElementsByName(`question-title-${question.id}`);
        if (titleInput?.[0]) {
          titleInput[0].focus();
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
   * 질문 추가
   */
  const handleAddQuestion = useCallback(() => {

    if(templete.questions.length >= 20) {
      toast.error('질문은 최대 20개까지만 생성 가능합니다.');
      return;
    }

    const newData = addQuestion();
    setTimeout(() => {
      const questionElement = document.getElementById(`question-${newData.id}`);
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [templete, addQuestion]);

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

  const handleChangeHeader = useCallback(
    (subject: string, description: string) => {
      changeSubject(subject, description);
    },
    [changeSubject]
  );

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
          <Button variant="contained" color="primary" onClick={handleMovePreviewPage}>
            미리보기
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreateSurvey}>
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
export default SurveyCreatePage;
