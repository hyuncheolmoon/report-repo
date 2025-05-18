'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { RiDeleteBinLine } from 'react-icons/ri';

import { usePathHandler, useStorageHandler } from '@/hooks';
import { Survey } from '@/types';
import { useConfirmDialog } from '@/contexts/confirm-context';

import { Button, debounce, IconButton } from '@mui/material';
import { RootTable, TableColumn } from '@/components/organisms/table';

import { FullPageLayout, Loading, PageContent, PageHeader } from '@/assets/styled';
import { palette } from '@/constants';
import { toast } from '@/utils';

const SurveyPage = () => {
  const router = useRouter();
  const { path } = usePathHandler();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getServeyList, deleteServey, deleteTempServey } = useStorageHandler();
  const { confirm } = useConfirmDialog();

  const [keyword, setKeyword] = useState<string>('');
  const [list, setList] = useState<Survey[]>([]);
  const [filterList, setFilterList] = useState<Survey[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /*****************************************************************************
   * INIT
   *****************************************************************************/

  const getList = useCallback(() => {
    const list = getServeyList();
    setList(list);
    setFilterList(list);
    setIsLoading(false);
    /** 방어 코드 : list페이지 접근시 임시 설문지 삭제 */
    deleteTempServey();
  }, [getServeyList, deleteTempServey]);

  useEffect(() => {
    getList();
  }, []);
  /*****************************************************************************
   * ACTION
   *****************************************************************************/

  /**
   * 키워드 검색을 통한 필터링
   */
  useEffect(() => {
    if (!keyword.trim()) {
      setFilterList(list);
      return;
    }
    const newList = list.filter((item) => item.subject.includes(keyword.trim()));
    setFilterList(newList);
  }, [keyword, list]);

  /**
   * 키워드 검색 입력 시 딜레이
   */
  const handleChangeKeyword = useCallback(
    debounce((keyword: string) => {
      setKeyword(keyword);
    }, 300),
    [list, searchInputRef]
  );

  const handleMoveCreateSurvey = useCallback(() => {
    router.push(path.create);
  }, [router, path]);

  const handleMoveDetailSurvey = useCallback(
    (templete: Survey) => {
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

  /**
   * 설문지 삭제
   */
  const handleDeleteSurvey = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>, templete: Survey) => {
      event.stopPropagation();
      const isConfirm = await confirm('삭제하시겠습니까?');
      if (!isConfirm) {
        return;
      }
      deleteServey(templete.id);
      setList(list.filter((item) => item.id !== templete.id));
      setFilterList(filterList.filter((item) => item.id !== templete.id));
      toast.success('삭제되었습니다.');
    },
    [list, filterList, deleteServey, confirm]
  );

  /*****************************************************************************
   * RENDER
   *****************************************************************************/

  /**
   * 삭제 버튼
   */
  const renderDeleteBtn = useCallback(
    (templete: Survey) => (
      <BtnGroup>
        <DeleteBtn data-testid="survey-delete-btn" onClick={(event) => handleDeleteSurvey(event, templete)}>
          <RiDeleteBinLine />
        </DeleteBtn>
      </BtnGroup>
    ),
    [handleDeleteSurvey]
  );

  /**
   * 테이블 컬럼 설정
   */
  const columns: TableColumn<Survey>[] = useMemo(
    () => [
      { key: 'id', title: 'ID' },
      { key: 'subject', title: '제목' },
      { title: '항목 수', render: (data: Survey) => <span>{data.questions?.length}</span> },
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
            <TotalCount data-testid="survey-total-count">설문지: {list.length} 개</TotalCount>
            <SearchInput
              data-testid="search-input"
              placeholder="검색어를 입력하세요"
              onChange={(e) => handleChangeKeyword(e.target.value)}
              ref={searchInputRef}
            />
          </TableHeader>
          {isLoading ? <Loading /> : <RootTable columns={columns} data={filterList} onClick={handleMoveDetailSurvey} />}
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
