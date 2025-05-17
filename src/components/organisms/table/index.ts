import RootTable from './table';
import TableHeader from './table-header';
import TableBody from './table-body';

export enum ColumnType {
  INDEX = 'INDEX',
  TEXT = 'TEXT',
  DATE = 'DATE',
}

type ColumnOptions = {
  dateFormat?: string;
};

type TableColumn<T> = {
  key?: string;
  type?: ColumnType;
  title?: string;
  width?: number;
  options?: ColumnOptions;
  render?: (item: T, idx: number) => React.ReactNode;
};

export type { TableColumn };
export { RootTable, TableBody, TableHeader };
