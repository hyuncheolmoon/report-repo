'use client';

import React, { useCallback, useEffect, useMemo, useState, forwardRef, useImperativeHandle } from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { RiCloseLine } from 'react-icons/ri';

import { palette } from '@/constants';
import { Survey } from '@/types';
import { ViewQuestionBox, ViewTitleBox } from '@/components/molecules';

export interface PreviewPanelHandler {
  open: (survey: Survey) => void;
  close: () => void;
}

const PreviewPanel = (_: Record<string, never>, ref: React.Ref<PreviewPanelHandler>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [survey, setSurvey] = useState<Survey | null>(null);

  /**
   * 패널 핸들러 
   */
  useImperativeHandle(ref, () => ({
    open: handleOpenSidePanel,
    close: handleCloseSidePanel,
  }));

  /*****************************************************************************
   * ACTION / EVENT
   *****************************************************************************/

  const handleOpenSidePanel = useCallback((surveyData: Survey) => {
    setSurvey(surveyData);
    setIsOpen(true);
  }, []);

  /**
   * 패널 Close
   */
  const handleCloseSidePanel = useCallback(() => {
    setIsOpen(false);
    setSurvey(null);
  }, []);

  /**
   * 패널 Close 키 이벤트 핸들러
   */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleCloseSidePanel();
      }
    },
    [isOpen, handleCloseSidePanel]
  );

  /**
   * 패널 Close 키 이벤트 
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const RenderHeader = useMemo(() => {
    return (
      <TitleContainer>
        <Title>설문지 미리보기</Title>
      </TitleContainer>
    );
  }, []);

  const RenderContents = useMemo(() => {
    if (!survey) {
      return null;
    }

    return (
      <PreviewContent>
        <ViewTitleBox subject={survey.subject || ''} description={survey.description} />
        {survey.questions.map((question) => (
          <ViewQuestionBox key={question.id} question={question} />
        ))}
      </PreviewContent>
    );
  }, [survey]);

  return (
    <PanelContainer isOpen={isOpen}>
      <PanelLayer>
        <PanelHeader>
          {RenderHeader}
          <IconButton onClick={handleCloseSidePanel}>
            <RiCloseLine size={24} />
          </IconButton>
        </PanelHeader>
        <PanelContents>{RenderContents}</PanelContents>
      </PanelLayer>
    </PanelContainer>
  );
};

PreviewPanel.displayName = 'PreviewPanel';

export default forwardRef<PreviewPanelHandler>(PreviewPanel);

const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: ${palette.gray900};
`;

const PanelContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  flex-grow: 1;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 0;
`;

const PanelLayer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  height: 100vh;
  overflow-y: hidden;
`;

const PanelContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-617px')};
  width: 617px;
  height: 100vh;
  background-color: ${palette.gray50};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
`;
