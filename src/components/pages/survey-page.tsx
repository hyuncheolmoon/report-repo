'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

import { Button, debounce } from '@mui/material';
// import { MdOutlineAdd } from "react-icons/md";
import { FullPageLayout, PageContent, PageHeader, PageLayout } from '@/assets/styled';
import { ColumnType, RootTable, TableColumn } from '@/components/organisms/table';

import { palette } from '@/constants';
import useStorageHandler from '@/hooks/use-storage-handler';
import { Templete, useTempleteStore } from '@/stores/use-templete-store';
import { toast } from '@/utils';
import { usePathHandler } from '@/hooks';

const SurveyPage = () => {
  const router = useRouter();
  const { path } = usePathHandler();
  const { getServeyList, deleteServey, deleteTempServey } = useStorageHandler();

  const [list, setList] = useState<Templete[]>([]);
  const [filterList, setFilterList] = useState<Templete[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  /*****************************************************************************
   * INIT
   *****************************************************************************/

  const getList = useCallback(() => {
    const list = getServeyList();
    setList(list);
    setFilterList(list);
    /** 방어 코드 : list페이지 접근시 임시 설문지 삭제 */
    deleteTempServey();
  }, [getServeyList, deleteTempServey]);

  useEffect(() => {
    getList();
  }, []);
  /*****************************************************************************
   * ACTION
   *****************************************************************************/

  const handleChangeKeyword = useCallback(
    (keyword: string) => {
      setKeyword(keyword);
      const newList = list.filter((item) => item.subject.includes(keyword));
      setFilterList(newList);
    },
    [list]
  );

  const handleMoveCreateSurvey = useCallback(() => {
    router.push(path.create);
  }, [router, path]);

  const handleMoveDetailSurvey = useCallback(
    (templete: Templete) => {
      router.push(`${path.main}/${templete.id}`);
    },
    [router, path]
  );

  const handleOpenPreview = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, templete: Templete) => {
      event.stopPropagation();
      console.log('sdfjksdf');
    },
    [router]
  );

  const handleDeleteSurvey = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, templete: Templete) => {
      event.stopPropagation();
      const confirm = window.confirm('삭제하시겠습니까?');
      if (!confirm) {
        return;
      }
      deleteServey(templete.id);
      setList(list.filter((item) => item.id !== templete.id));
      toast.success('삭제되었습니다.');
    },
    [router]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const renderPreviewBtn = useCallback(
    (templete: Templete) => {
      return (
        <Button variant="contained" color="primary" onClick={(event) => handleOpenPreview(event, templete)}>
          미리보기
        </Button>
      );
    },
    [router]
  );

  const renderDeleteBtn = useCallback(
    (templete: Templete) => {
      return (
        <Button variant="contained" color="primary" onClick={(event) => handleDeleteSurvey(event, templete)}>
          삭졔
        </Button>
      );
    },
    [router]
  );

  const columns: TableColumn[] = useMemo(
    () => [
      { key: 'id', title: 'ID' },
      { key: 'subject', title: '제목' },
      { title: '항목 수', render: (data: Templete) => <span>{data.questions?.length}</span> },
      { key: 'createdAt', title: '생성일' },
      { key: 'updatedAt', title: '수정일' },
      { title: '미리보기', render: renderPreviewBtn },
      { title: '삭졔', render: renderDeleteBtn },
    ],
    [renderPreviewBtn, renderDeleteBtn]
  );

  return (
    <FullPageLayout>
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
            <SearchInput
              placeholder="검색어를 입력하세요"
              onChange={(e) => handleChangeKeyword(e.target.value)}
              value={keyword}
            />
          </TableHeader>
          <RootTable columns={columns} data={filterList} onClick={handleMoveDetailSurvey} />
        </TableContainer>
      </PageContent>
    </FullPageLayout>
  );
};
export default SurveyPage;

const SearchInput = styled.input`
  width: 300px;
  padding: 8px 18px;
  height: 43px;
  position: relative;
  border-radius: 12px;
  border: 1px solid ${palette.gray300};
  background-color: ${palette.white};
`;

const TotalCount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${palette.gray900};
`;

const TableHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 18px;
  height: auto;
`;

const TableContainer = styled.div`
  padding: 24px 18px 24px 18px;
  position: relative;
  box-shadow: rgba(145, 158, 171, 0.2) 0 0 2px 0;
  height: 100%;
`;
