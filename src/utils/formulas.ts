import { evaluate } from 'mathjs';
import { CellData } from '../types/sheet';

export function evaluateFormula(formula: string, cells: { [key: string]: CellData }): string {
  if (!formula.startsWith('=')) {
    return formula;
  }

  try {
    const expression = formula.substring(1)
      .replace(/([A-Z]+[0-9]+)/g, (match) => {
        const cellValue = cells[match]?.value || '0';
        return isNaN(Number(cellValue)) ? `"${cellValue}"` : cellValue;
      });

    if (expression.startsWith('SUM')) {
      return calculateSum(expression, cells);
    } else if (expression.startsWith('AVERAGE')) {
      return calculateAverage(expression, cells);
    } else if (expression.startsWith('MAX')) {
      return calculateMax(expression, cells);
    } else if (expression.startsWith('MIN')) {
      return calculateMin(expression, cells);
    } else if (expression.startsWith('COUNT')) {
      return calculateCount(expression, cells);
    }

    return evaluate(expression).toString();
  } catch (error) {
    return '#ERROR!';
  }
}

function extractRange(expression: string): string[] {
  const match = expression.match(/\((.*?)\)/);
  if (!match) return [];
  
  const [start, end] = match[1].split(':');
  if (!start || !end) return [];

  const startCol = start.match(/[A-Z]+/)?.[0] || '';
  const startRow = parseInt(start.match(/\d+/)?.[0] || '0');
  const endCol = end.match(/[A-Z]+/)?.[0] || '';
  const endRow = parseInt(end.match(/\d+/)?.[0] || '0');

  const cells: string[] = [];
  for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
    for (let row = startRow; row <= endRow; row++) {
      cells.push(`${String.fromCharCode(col)}${row}`);
    }
  }

  return cells;
}

function calculateSum(expression: string, cells: { [key: string]: CellData }): string {
  const range = extractRange(expression);
  const sum = range.reduce((acc, cellId) => {
    const value = Number(cells[cellId]?.value || 0);
    return acc + (isNaN(value) ? 0 : value);
  }, 0);
  return sum.toString();
}

function calculateAverage(expression: string, cells: { [key: string]: CellData }): string {
  const range = extractRange(expression);
  const values = range
    .map((cellId) => Number(cells[cellId]?.value || 0))
    .filter((value) => !isNaN(value));
  
  if (values.length === 0) return '0';
  const average = values.reduce((acc, val) => acc + val, 0) / values.length;
  return average.toString();
}

function calculateMax(expression: string, cells: { [key: string]: CellData }): string {
  const range = extractRange(expression);
  const values = range
    .map((cellId) => Number(cells[cellId]?.value || 0))
    .filter((value) => !isNaN(value));
  
  if (values.length === 0) return '0';
  return Math.max(...values).toString();
}

function calculateMin(expression: string, cells: { [key: string]: CellData }): string {
  const range = extractRange(expression);
  const values = range
    .map((cellId) => Number(cells[cellId]?.value || 0))
    .filter((value) => !isNaN(value));
  
  if (values.length === 0) return '0';
  return Math.min(...values).toString();
}

function calculateCount(expression: string, cells: { [key: string]: CellData }): string {
  const range = extractRange(expression);
  const count = range.filter((cellId) => {
    const value = cells[cellId]?.value;
    return value && !isNaN(Number(value));
  }).length;
  return count.toString();
}

export function applyDataQualityFunction(func: string, value: string): string {
  switch (func.toUpperCase()) {
    case 'TRIM':
      return value.trim();
    case 'UPPER':
      return value.toUpperCase();
    case 'LOWER':
      return value.toLowerCase();
    default:
      return value;
  }
}