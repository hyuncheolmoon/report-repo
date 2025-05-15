'use client';

import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import { TableColumn, TableHeader, TableBody } from './index';

type RootTableProps<T> = {
  columns: TableColumn[];
  data: T[];
};

const RootTable = <T,>({ columns, data }: RootTableProps<T>) => {
  return (
    <TableLayout>
      <Table>
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
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
  min-width: 500px;
`;

