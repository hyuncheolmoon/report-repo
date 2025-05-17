import styled from '@emotion/styled';

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

export const FullPageLayout = styled(PageLayout)`
  min-width: unset;
`;

