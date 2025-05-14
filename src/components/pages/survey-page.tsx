'use client';

import { useMemo } from 'react';
import styled from '@emotion/styled';
import { ColumnType, RootTable, TableColumn } from '../organisms/table';
import { palette } from '@/constants';
import { PageContent, PageHeader, PageLayout } from '@/assets/styled';


const SurveyPage = () => {


  /*****************************************************************************
   * INIT
   *****************************************************************************/

  /*****************************************************************************
   * ACTION
   *****************************************************************************/

  const columns: TableColumn[] = useMemo(
    () => [
      {
        id: 'id',
        title: 'ID',
      },
      {
        id: 'title',
        title: '제목',
      },
      { key: 'itemCount', title: '항목 수' },
      {
        key: 'createdAt',
        title: '생성일',
        type: ColumnType.DATE,
      },
      {
        key: 'updatedAt',
        title: '수정일',
        type: ColumnType.DATE,
      },
      {
        title: '수정',
        render: (row: any) => {
          return <span>수정</span>;
        },
      },
      {
        title: '상세',
        render: (row: any) => {
          return <span>상세</span>;
        },
      },
    ],
    [],
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  return (
    <PageLayout>
      <PageHeader>설문 관리</PageHeader>

      <PageContent>
        <TableContainer>
          <TableHeader>
            <TotalCount>총 {10} 개</TotalCount>
          </TableHeader>
          <RootTable columns={columns} data={[]} />
        </TableContainer>
      </PageContent>

    </PageLayout>
  );
};
export default SurveyPage;

const TotalCount = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.gray900};
`;

const TableHeader = styled.div`
  width: 100%;
  padding: 8px 18px;
  height: 43px;
  position: relative;
`;


const TableContainer = styled.div`
  padding: 12px 0;
  position: relative;
  box-shadow:
    rgba(145, 158, 171, 0.2) 0 0 2px 0,
    rgba(145, 158, 171, 0.12) 0 12px 24px -4px;
  z-index: 0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-radius: 16px;
  background-color: ${palette.white};
  overflow-y: auto;



`;
