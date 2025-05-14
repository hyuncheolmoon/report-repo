'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

import { palette } from '@/constants';
import { toast } from '@/utils';

interface IPreviewItem {
  uuid: number;
  title: string;
  items: string;
  createdAt: string;
  updatedAt: string;
}

type PreviewPanelProps = {
  uuid: number;
  title: string;
}



const PreviewPanel = ({ uuid, title }: PreviewPanelProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const [previewList, setPreviewList] = useState<IPreviewItem[]>([]);





  /*****************************************************************************
   * ACTION / EVENT
   *****************************************************************************/

  /**
   * 사이드 패널 닫기 
   */
  const handleCloseSidePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * 사이드 패널 열기
   */
  const handleOpenSidePanel = useCallback(() => {
    if (isOpen) {
      return handleCloseSidePanel();
    }
    setIsOpen(true);
  }, [isOpen, handleCloseSidePanel]);


  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      handleCloseSidePanel();
    }
  }, [isOpen, handleCloseSidePanel]);


  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);





  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const RenderHeader = useMemo(() => {
    return (
      <TitleContainer>
        <Title>템플릿 미리보기</Title>
      </TitleContainer>
    );
  }, []);

  const RenderContents = useMemo(() => {
    return (
      <>
        {previewList.map(preview => (
          <QuestionItem key={preview.uuid}>
            <ItemHeader>
              <QuestionInfo>
                {moment(preview.createdAt).format('YYYY-MM-DD HH:mm')} | {preview.updatedAt}
              </QuestionInfo>
            </ItemHeader>
            <QuestionContent>
              <QuestionTitle>{'test'}</QuestionTitle>
              <QuestionDescription>{'test'}</QuestionDescription>
            </QuestionContent>
          </QuestionItem>
        ))}
      </>
    );
  }, [previewList]);

  return (
    <PanelContainer isOpen={isOpen}>
      <ToggleButton onClick={handleOpenSidePanel}>
        뉴스
      </ToggleButton>
      <PanelLayer>
        <PanelHeader>
          {RenderHeader}
          <IconButton onClick={handleCloseSidePanel}>
          </IconButton>
        </PanelHeader>
        <PanelContents>
          {RenderContents}
        </PanelContents>
      </PanelLayer>
    </PanelContainer>
  );
};

export default PreviewPanel;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 30px;
  color: ${palette.gray900};
`;


const PanelContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  overflow-y: auto;
  flex-grow: 1;
`;

const ItemHeader = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 4px 0 18px;
`;

const QuestionInfo = styled.div`
  font-size: 15px;
  color: ${palette.purple900};
`;

const QuestionContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuestionTitle = styled.div`
  white-space: pre-wrap;
  font-size: 23px;
  font-weight: 700;
  color: ${palette.gray900};
  display: -webkit-box; /* 플렉스 박스를 위한 설정 */
  -webkit-line-clamp: 2; /* 줄 수 제한: 여기선 2줄 */
  -webkit-box-orient: vertical; /* 박스 방향 세로로 */
  overflow: hidden; /* 넘친 내용 숨기기 */
  text-overflow: ellipsis;
`;

const QuestionDescription = styled.div`
  font-size: 17px;
  white-space: pre-wrap;
  color: ${palette.gray700};
  line-height: 1.5;
  display: -webkit-box; /* 플렉스 박스를 위한 설정 */
  -webkit-line-clamp: 2; /* 줄 수 제한: 여기선 2줄 */
  -webkit-box-orient: vertical; /* 박스 방향 세로로 */
  overflow: hidden; /* 넘친 내용 숨기기 */
  text-overflow: ellipsis;
`;



const QuestionItem = styled.a`
  display: flex;
  flex-direction: column;
  padding: 18px 28px;

  background-color: #f4f6f8;
  border: 1px solid #f4f6f8;
  border-radius: 20px;
  /* transition: transform 0.3s ease; */
  cursor: pointer;
  text-decoration: none;

  &:hover{
    /* transform: scale(0.99); */
    opacity: 0.8;
  }
`;


const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 10px;
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
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  left: -59px;
  top: 180px;
  //transform: translateY(-50%);
  width: 59px;
  height: 136px;
  background-color: ${palette.purple900};
  color: ${palette.white};
  border: ${palette.purple900};
  cursor: pointer;
  border-radius: 18px 0 0 18px;
  font-size: 25px;
  gap: 8px;
`;
