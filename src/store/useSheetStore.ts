import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { SheetState, CellData, CellStyle } from '../types/sheet';
import { evaluateFormula } from '../utils/formulas';

const DEFAULT_CELL_STYLE: CellStyle = {
  bold: false,
  italic: false,
  fontSize: 14,
  color: '#000000',
};

interface SheetStore extends SheetState {
  setCellValue: (cellId: string, value: string) => void;
  setCellFormula: (cellId: string, formula: string) => void;
  setCellStyle: (cellId: string, style: Partial<CellStyle>) => void;
  setSelectedCell: (cellId: string | null) => void;
  setSelectedRange: (range: string[] | null) => void;
  setColumnWidth: (colId: string, width: number) => void;
  setRowHeight: (rowId: string, height: number) => void;
}

export const useSheetStore = create<SheetStore>()(
  immer((set) => ({
    cells: {},
    selectedCell: null,
    selectedRange: null,
    columnWidths: {},
    rowHeights: {},

    setCellValue: (cellId, value) =>
      set((state) => {
        if (!state.cells[cellId]) {
          state.cells[cellId] = {
            value: '',
            formula: '',
            style: { ...DEFAULT_CELL_STYLE },
          };
        }
        state.cells[cellId].value = value;
        state.cells[cellId].formula = '';
      }),

    setCellFormula: (cellId, formula) =>
      set((state) => {
        if (!state.cells[cellId]) {
          state.cells[cellId] = {
            value: '',
            formula: '',
            style: { ...DEFAULT_CELL_STYLE },
          };
        }
        state.cells[cellId].formula = formula;
        state.cells[cellId].value = evaluateFormula(formula, state.cells);
      }),

    setCellStyle: (cellId, style) =>
      set((state) => {
        if (!state.cells[cellId]) {
          state.cells[cellId] = {
            value: '',
            formula: '',
            style: { ...DEFAULT_CELL_STYLE },
          };
        }
        state.cells[cellId].style = { ...state.cells[cellId].style, ...style };
      }),

    setSelectedCell: (cellId) =>
      set((state) => {
        state.selectedCell = cellId;
      }),

    setSelectedRange: (range) =>
      set((state) => {
        state.selectedRange = range;
      }),

    setColumnWidth: (colId, width) =>
      set((state) => {
        state.columnWidths[colId] = width;
      }),

    setRowHeight: (rowId, height) =>
      set((state) => {
        state.rowHeights[rowId] = height;
      }),
  }))
);