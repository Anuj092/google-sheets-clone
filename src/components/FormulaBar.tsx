import React, { useState, useEffect } from 'react';
import { useSheetStore } from '../store/useSheetStore';

export const FormulaBar: React.FC = () => {
  const { selectedCell, cells, setCellFormula } = useSheetStore();
  const [formula, setFormula] = useState('');

  useEffect(() => {
    if (selectedCell && cells[selectedCell]) {
      setFormula(cells[selectedCell].formula || cells[selectedCell].value);
    } else {
      setFormula('');
    }
  }, [selectedCell, cells]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  const handleFormulaSubmit = () => {
    if (!selectedCell) return;
    
    if (formula.startsWith('=')) {
      setCellFormula(selectedCell, formula);
    } else {
      setCellFormula(selectedCell, formula);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <div className="font-mono bg-gray-100 px-2 py-1 rounded">
        {selectedCell || ''}
      </div>
      <input
        className="flex-1 px-2 py-1 border rounded"
        value={formula}
        onChange={handleFormulaChange}
        onBlur={handleFormulaSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleFormulaSubmit();
          }
        }}
        placeholder="Enter a value or formula (start with =)"
      />
    </div>
  );
};