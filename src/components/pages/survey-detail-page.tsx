'use client';

import { useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';
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

import { usePathHandler, useStorageHandler } from '@/hooks';
import { useTempleteStore } from '@/stores/use-templete-store';

import { ModifyQuestionBox, ModifyTitleBox } from '@/components/molecules';

import { toast } from '@/utils';

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
  }, [setTemplete, surveyId, deleteTempServey, getServey, getTempServey, router, path]);

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
    updateServey({ ...templete, id: surveyId as string, updatedAt: nowDate });
    toast.success('설문이 수정 되었습니다.');
    deleteTempServey();
    router.push('/survey');
    reset();
  }, [templete, deleteTempServey, reset, router, path, surveyId, updateServey]);

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

  /**
   * 질문 추가
   */
  const handleAddQuestion = useCallback(() => {
    if (templete.questions.length >= 20) {
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
   * 헤더에 포함된 정보 변경(title, description)
   */
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
