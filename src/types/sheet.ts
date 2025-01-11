export interface CellData {
  value: string;
  formula: string;
  style: CellStyle;
}

export interface CellStyle {
  bold: boolean;
  italic: boolean;
  fontSize: number;
  color: string;
}

export interface SheetState {
  cells: { [key: string]: CellData };
  selectedCell: string | null;
  selectedRange: string[] | null;
  columnWidths: { [key: string]: number };
  rowHeights: { [key: string]: number };
}

export type CellPosition = {
  row: number;
  col: number;
};