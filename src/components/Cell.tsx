import React, { useState, useCallback } from 'react';
import { useSheetStore } from '../store/useSheetStore';
import clsx from 'clsx';

interface CellProps {
  id: string;
  row: number;
  col: number;
}

export const Cell: React.FC<CellProps> = ({ id, row, col }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { cells, selectedCell, setCellValue, setCellFormula, setSelectedCell } = useSheetStore();
  const cell = cells[id] || { value: '', formula: '', style: {} };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    const value = e.target.value;
    
    if (value.startsWith('=')) {
      setCellFormula(id, value);
    } else {
      setCellValue(id, value);
    }
  };

  const handleClick = () => {
    setSelectedCell(id);
  };

  return (
    <div
      className={clsx(
        'border border-gray-200 p-1 min-w-[100px] min-h-[24px] relative',
        selectedCell === id && 'bg-blue-100',
        cell.style.bold && 'font-bold',
        cell.style.italic && 'italic'
      )}
      style={{
        color: cell.style.color,
        fontSize: `${cell.style.fontSize}px`,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          autoFocus
          className="absolute inset-0 w-full h-full p-1"
          defaultValue={cell.formula || cell.value}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
      ) : (
        <span>{cell.value}</span>
      )}
    </div>
  );
};