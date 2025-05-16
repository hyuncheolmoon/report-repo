'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styled from '@emotion/styled';

import { FullPageLayout, PageContent, PageHeader, ContentLayer, SurveyContainer, BackButton } from '@/assets/styled';

import useStorageHandler from '@/hooks/use-storage-handler';
import { Templete } from '@/stores/use-templete-store';

import { ViewQuestionBox, ViewTitleBox } from '@/components/molecules';

import { usePathHandler } from '@/hooks';
import { RiArrowLeftLine } from 'react-icons/ri';

const SurveyPreviewPage = () => {
  const router = useRouter();

  const [templete, setTemplete] = useState<Templete>();
  const { getTempServey } = useStorageHandler();
  const { path } = usePathHandler();

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

const RightBtnGroup = styled.div`
  display: flex;
  gap: 10px;
`;
