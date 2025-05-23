'use client';

import React from 'react';
import styled from '@emotion/styled';

import { TableColumn, TableHeader, TableBody } from './index';

type RootTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  onClick?: (item: T) => void;
};

const RootTable = <T,>({ columns, data, onClick }: RootTableProps<T>) => {
  return (
    <TableLayout>
      <Table data-testid="table">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} onClick={onClick} />
      </Table>
    </TableLayout>
  );
};

export default RootTable;

const Table = styled.table`
  display: table;
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
  border-style: none;
`;

const TableLayout = styled.div`
  // min-width: 500px;
  overflow-x: auto;
`;
