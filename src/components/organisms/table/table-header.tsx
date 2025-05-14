'use client';

import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { palette } from '@/constants';
import { TableColumn } from '@/components/organisms/table';

type TableHeaderProps = {
  columns: TableColumn[];
};

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <THead>
      <Tr>
        {columns.map((col, idx) => (
          <Th key={`column-${col.key}-${idx}`} width={col?.width}>{col.title}</Th>
        ))}
      </Tr>
    </THead>
  );
};

export default TableHeader;

const THead = styled.thead`
  display: table-header-group;
  text-align: center;
`;

const Tr = styled.tr`
  min-height: 30px;
`;

const Th = styled.th`
  vertical-align: middle;
  text-align: center;
  line-height: 1.2;
  white-space: pre-wrap;
  font-weight: 600;
  color: ${palette.gray800};
  border-style: none;
  border-top: 1px solid ${palette.gray400};
  border-bottom: 1px solid ${palette.gray400};
  height: 54px;
  padding-left: 18px;
  padding-right: 18px;

  ${({ width }: { width?: number }) =>
    width &&
    css`
      width: ${width}px;
    `};
`;

