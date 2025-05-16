'use client';

import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { palette } from '@/constants';
import { ColumnType, TableColumn } from '@/components/organisms/table';

type TableBodyProps<T> = {
  columns: TableColumn[];
  data: Array<T>;
  onClick?: (item: T) => void;
};

const TableBody = <T,>({ data, columns, onClick }: TableBodyProps<T>) => {
  const list = useMemo(() => {
    return data.map((item, idx) => {
      return columns.map((column) => {
        if (column.type === ColumnType.INDEX) {
          return idx + 1;
        }
        if (column.render) {
          return column.render(item, idx as number);
        }
        return item[column.key as keyof T] || '';
      });
    });
  }, [columns, data]);

  if (!data || data.length === 0) {
    return (
      <TBody>
        <Tr nodata={true}>
          <NoData colSpan={columns.length}>표시할 정보가 없습니다.</NoData>
        </Tr>
      </TBody>
    );
  }

  return (
    <TBody>
      {list.map((item, listIdx) => (
        <Tr key={`tr-${listIdx}`} onClick={() => onClick?.(data[listIdx])}>
          {item.map((value, itemIdx) => (
            <Td key={`td-${itemIdx}`}>{value}</Td>
          ))}
        </Tr>
      ))}
    </TBody>
  );
};

export default TableBody;
const NoData = styled.td`
  font-size: 18px;
  text-align: center;
  vertical-align: middle;
  height: 150px;
`;

const Tr = styled.tr<{ onClick?: () => void; nodata?: boolean }>`
  display: table-row;
  min-height: 25px;
  ${({ onClick }) =>
    onClick &&
    `
    cursor: pointer;
  `}
  &:hover {
    background-color: ${({ nodata }) => (!nodata ? 'rgba(71, 127, 232, 0.1)' : 'transparent')};
  }
`;

const Td = styled.td`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 16px 18px;
  font-size: 14px;
  color: ${palette.gray900};
  border-style: none;
  border-bottom: 1px dashed ${palette.gray400};
`;
const TBody = styled.tbody`
  display: table-row-group;
  text-align: center;
`;
