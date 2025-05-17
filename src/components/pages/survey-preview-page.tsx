'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';

import { usePathHandler, useStorageHandler } from '@/hooks';
import { Templete } from '@/stores';

import { ViewQuestionBox, ViewTitleBox } from '@/components/molecules';
import { FullPageLayout, PageContent, PageHeader, ContentLayer, SurveyContainer, BackButton } from '@/assets/styled';

const SurveyPreviewPage = () => {
  const router = useRouter();

  const { getTempServey } = useStorageHandler();

  const { path } = usePathHandler();

  const [templete, setTemplete] = useState<Templete>();

  const getData = useCallback(() => {
    const survey = getTempServey();
    setTemplete(survey);
  }, []);

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
        <BackButton variant="text" color="primary" onClick={handleMoveDetailPage}>
          <RiArrowLeftLine />
          미리보기
        </BackButton>
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
