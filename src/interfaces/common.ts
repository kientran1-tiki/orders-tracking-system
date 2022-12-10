import { AlignType } from "rc-table/lib/interface";

export interface OrderColumnTypes {
  isResize?: boolean;
  required?: boolean;
  type?: string;
  title?: string;
  dataIndex?: string;
  width?: number;
  isOnClickRow?: boolean;
  renderInSearch?: boolean;
  isHide?: boolean;
  span?: number;
  align?: AlignType;
  key?: any;
  sortDirections?: any;
  sorter?: any;
  render?: (text: any, record: any, index: any) => any;
}
