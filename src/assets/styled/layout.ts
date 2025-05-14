import styled from '@emotion/styled';
import { palette } from '@/constants';

export const PageHeader = styled.div`
  font-size: 24px;
  margin: 0 18px;
  padding: 20px 20px 12px 12px;
  font-weight: 500;
  border-bottom: 1px solid rgb(224, 224, 224);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PageContent = styled.div`
  padding: 12px 18px 20px 18px;
  height: 100%;
  overflow-y: auto;
`;

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  box-sizing: border-box;
  height: 100%;
  min-width: 778px;
  width: 100%;
  position: relative;

`;
