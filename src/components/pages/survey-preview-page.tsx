'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';

import { usePathHandler, useStorageHandler } from '@/hooks';
import { Survey } from '@/types';

import { ViewQuestionBox, ViewTitleBox } from '@/components/molecules';
import {
  FullPageLayout,
  PageContent,
  PageHeader,
  ContentLayer,
  SurveyContainer,
  LeftBtnGroup,
  BackButton,
} from '@/assets/styled';

const SurveyPreviewPage = () => {
  const router = useRouter();

  const { getTempServey } = useStorageHandler();

  const { path } = usePathHandler();

  const [templete, setTemplete] = useState<Survey | null>(null);

  const getData = useCallback(() => {
    const survey = getTempServey();
    setTemplete(survey);
  }, [getTempServey]);

  useEffect(() => {
    getData();
  }, []);

  /*****************************************************************************
   * ACTION
   *****************************************************************************/

  /**
   * 템플릿 상세 페이지로 이동(뒤로가기)
   */
  const handleMoveDetailPage = useCallback(() => {
    if (templete?.id) {
      router.push(`${path.main}/${templete?.id}`);
    } else {
      router.push(path.create);
    }
  }, [path, router, templete]);

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  if (!templete) {
    return null;
  }

  return (
    <FullPageLayout>
      <PageHeader>
        <LeftBtnGroup>
          <BackButton onClick={handleMoveDetailPage}>
            <RiArrowLeftLine />
          </BackButton>
          미리보기
        </LeftBtnGroup>
      </PageHeader>

      <PageContent>
        <SurveyContainer>
          <ContentLayer>
            <ViewTitleBox subject={templete?.subject || ''} description={templete?.description} />
            {templete?.questions.map((question) => <ViewQuestionBox key={question.id} question={question} />)}
          </ContentLayer>
        </SurveyContainer>
      </PageContent>
    </FullPageLayout>
  );
};
export default SurveyPreviewPage;
