import styled from '@emotion/styled';
import { palette } from '@/constants';
import { IconButton, Button } from '@mui/material';

export const QuestionItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 24px 12px;
  background-color: ${palette.white};
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const QuestionHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

export const QuestionContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FloatingArea = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
`;

export const FloatingButton = styled(IconButton)`
  width: 56px;
  height: 56px;
  background-color: ${palette.main};
  color: ${palette.white};
  font-size: 29px;
  border-radius: 50%;
  min-width: unset;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.8;
    background-color: ${palette.main};
  }
`;

export const ContentLayer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 48px;
  gap: 16px;
  max-width: 830px;
  margin: 0 auto;
`;
export const SurveyContainer = styled.div`
  padding: 20px;
  background-color: #c3f0db47;
  min-height: 100%;
`;

export const BackButton = styled(Button)`
  color: ${palette.gray900};
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Required = styled.span`
  font-weight: 500;
  color: ${palette.red200};
  margin-left: 4px;
  font-size: inherit;
  &:after {
    content: '*';
    color: ${palette.red200};
  }
`;

export const RightBtnGroup = styled.div`
  display: flex;
  gap: 10px;
`;
