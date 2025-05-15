'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

import { Button } from '@mui/material';
// import { MdOutlineAdd } from "react-icons/md";
import { PageContent, PageHeader, PageLayout } from '@/assets/styled';
import { ColumnType, RootTable, TableColumn } from '@/components/organisms/table';

import { palette } from '@/constants';
import useStorageHandler from '@/hooks/use-storage-handler';
import { Templete } from '@/stores/use-templete-store';

const SurveyPage = () => {
  const router = useRouter();
  const { getServeyList } = useStorageHandler();
  const [list, setList] = useState<Templete[]>([]);
  /*****************************************************************************
   * ACTION
   *****************************************************************************/
  const handleMoveCreateSurvey = useCallback(() => {
    router.push('/survey/create');
  }, [router]);

  const handleMoveDetailSurvey = useCallback(
    (templete: Templete) => {
      router.push(`/survey/modify/${templete.id}`);
    },
    [router]
  );

  useEffect(() => {
    const list = getServeyList();
    console.log(list)
    setList(list);
  }, [getServeyList]);

  /*****************************************************************************
   * RENDER
   *****************************************************************************/
  const columns: TableColumn[] = useMemo(
    () => [
      {
        key: 'id',
        title: 'ID',
      },
      {
        key: 'subject',
        title: '제목',
      },
      { title: '항목 수', render: (data: Templete) => <span>{data.questions?.length}</span> },
      {
        key: 'createdAt',
        title: '생성일',
      },
      {
        key: 'updatedAt',
        title: '수정일',
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
    []
  );

  return (
    <PageLayout>
      <PageHeader>
        설문 관리
        <Button variant="contained" color="primary" onClick={handleMoveCreateSurvey}>
          새 설문지 작성
        </Button>
      </PageHeader>

      <PageContent>
        <TableContainer>
          <TableHeader>
            <TotalCount>총 {list.length} 개</TotalCount>
          </TableHeader>
          <RootTable columns={columns} data={list} onClick={handleMoveDetailSurvey} />
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
