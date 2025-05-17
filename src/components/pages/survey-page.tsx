'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { RiDeleteBinLine } from 'react-icons/ri';

import { usePathHandler, useStorageHandler } from '@/hooks';
import { Templete } from '@/stores';

import { Button, IconButton } from '@mui/material';
import { RootTable, TableColumn } from '@/components/organisms/table';

import { FullPageLayout, PageContent, PageHeader } from '@/assets/styled';
import { palette } from '@/constants';
import { toast } from '@/utils';

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

  //const handleOpenPreview = useCallback(
  //  (event: React.MouseEvent<HTMLButtonElement>, templete: Templete) => {
  //    event.stopPropagation();
  //    console.log('sdfjksdf');
  //  },
  //  [router]
  //);

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
    [list, deleteServey]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  const renderDeleteBtn = useCallback(
    (templete: Templete) => (
      <BtnGroup>
        <DeleteBtn name="delete-btn" onClick={(event) => handleDeleteSurvey(event, templete)}>
          <RiDeleteBinLine />
        </DeleteBtn>
      </BtnGroup>
    ),
    [handleDeleteSurvey]
  );

  const columns: TableColumn<Templete>[] = useMemo(
    () => [
      { key: 'id', title: 'ID' },
      { key: 'subject', title: '제목' },
      { title: '항목 수', render: (data: Templete) => <span>{data.questions?.length}</span> },
      { key: 'createdAt', title: '생성일' },
      { key: 'updatedAt', title: '수정일' },
      { title: '삭졔', render: renderDeleteBtn },
    ],
    [renderDeleteBtn]
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
            <TotalCount>설문지: {list.length} 개</TotalCount>
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

const DeleteBtn = styled(IconButton)`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${palette.red700};
`;

const BtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

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
  padding: 8px;
  height: auto;
`;

const TableContainer = styled.div`
  padding: 24px 18px 24px 18px;
  position: relative;
  box-shadow: rgba(145, 158, 171, 0.2) 0 0 2px 0;
  height: 100%;
`;
