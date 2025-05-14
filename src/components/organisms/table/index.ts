import RootTable from './table';
import TableHeader from './table-header';
import TableBody from './table-body';

export enum ColumnType {
  INDEX = 'INDEX',
  TEXT = 'TEXT',
  DATE = 'DATE',
}

type ColumnOptions = {
  color?: (value: any) => string;
  dateFormat?: string;
};

type TableColumn = {
  key?: string;
  type?: ColumnType;
  title?: string;
  width?: number;
  customText?: (value: any) => string;
  options?: ColumnOptions;
  render?: (item: any, idx: number) => any;
};

export type { TableColumn };
export { RootTable, TableBody, TableHeader };
