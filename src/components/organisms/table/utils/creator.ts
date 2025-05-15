import react from 'react';
import moment from 'moment';
import { TableColumn, ColumnType } from '../index';

export type CreatorProps = {
  getView: (column: TableColumn, value: string) => any;
};

const DefaultFormat = 'YYYY-MM-DD HH:mm:ss';

const creator: CreatorProps = (() => {
  /******************************************************************************************
   * create elements
   *****************************************************************************************/
  const createElement = (text: string, color?: string) => {
    return react.createElement(
      'span',
      { style: { color: color || 'inherit', whiteSpace: 'pre-wrap', wordBreak: 'break-all' } },
      text
    );
  };

  /******************************************************************************************
   * format date
   *****************************************************************************************/

  const getColor = (value: string | number, color?: any) => {
    if (typeof color === 'function') {
      return color(value);
    }
    return color;
  };

  /**
   * 문구 출력
   */
  const getText = (column: TableColumn, value: string) => {
    const color = getColor(value, column.options?.color);
    if (column?.customText) {
      return createElement(column.customText(value), color);
    }

    if (!value) {
      return '-';
    }
    return createElement(value, color);
  };

  const getFormatDate = (text: string, format?: string) => {
    if (!text) {
      return '-';
    }
    return moment(text).format(format || DefaultFormat);
  };

  const getView = (column: TableColumn, value: string) => {
    const type = column?.type || ColumnType.TEXT;

    let text = value;
    let cellFn: any;
    switch (type) {
      case ColumnType.DATE:
        text = getFormatDate(value, column.options?.dateFormat);
        cellFn = getText;
        break;
      case ColumnType.TEXT:
      default:
        cellFn = getText;
        break;
    }
    return cellFn(column, text);
  };

  return { getView };
})();

export default creator;
