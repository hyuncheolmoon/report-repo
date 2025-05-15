'use client';

import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { palette } from '@/constants';
import { ColumnType, TableColumn } from '@/components/organisms/table';
import creator from './utils/creator';


type TableBodyProps = {
  columns: TableColumn[];
  data: any[];
};

const TableBody = ({ data, columns }: TableBodyProps) => {
  console.log(data)
  const list = useMemo(() => {
    return data.map((item, idx) => {
      return columns.map(column => {
        if (column.type === ColumnType.INDEX) {
          return idx + 1;
        }
        if (column.render) {
          return column.render(item, idx as number);
        }
        return item[column.key as keyof any] || '';
      });
    });
  }, [columns, data]);

  if (!data || data.length === 0) {
    return (
      <TBody>
        <Tr>
          <NoData colSpan={columns.length}>표시할 정보가 없습니다.</NoData>
        </Tr>
      </TBody>
    );
  }

  return (
    <TBody>
      {list.map((items, listIdx) => (
        <Tr key={`tr-${listIdx}`}>
          {items.map((item, itemIdx) => (
            <Td key={`td-${itemIdx}-${item}`}>{item}</Td>
          ))}
        </Tr>
      ))}
    </TBody>
  );
};

export default TableBody;
const NoData = styled.td`
  font-size: 18px;
  height: 150px;
  text-align: center;
  vertical-align: middle;
  //padding-top: 50px;
  //position: absolute;
  width: 100%;
  border: 1px solid ${palette.gray200};
`;

const Tr = styled.tr`
  display: table-row;
  min-height: 25px;

  &:hover {
    background-color: rgba(71, 127, 232, 0.1);
  }
`;

const Td = styled.td`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 8px 18px;
  color: ${palette.gray900};
  border-style: none;
  border-bottom: 1px dashed ${palette.gray400};
`;
const TBody = styled.tbody`
  display: table-row-group;
  text-align: center;
`;
