import styled from '@emotion/styled';
import { palette } from '@/constants';

export const QuestionContainer = styled.div`
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

