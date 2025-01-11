import React from 'react';
import { useSheetStore } from '../store/useSheetStore';
import { Bold, Italic, Type, Palette } from 'lucide-react';

export const Toolbar: React.FC = () => {
  const { selectedCell, cells, setCellStyle } = useSheetStore();

  const handleStyleChange = (styleUpdate: any) => {
    if (!selectedCell) return;
    setCellStyle(selectedCell, styleUpdate);
  };

  const currentCell = selectedCell ? cells[selectedCell] : null;

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <div className="flex items-center gap-1 border-r pr-2">
        <button
          className={`p-1 hover:bg-gray-100 rounded ${
            currentCell?.style.bold ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleStyleChange({ bold: !currentCell?.style.bold })}
        >
          <Bold size={18} />
        </button>
        <button
          className={`p-1 hover:bg-gray-100 rounded ${
            currentCell?.style.italic ? 'bg-gray-200' : ''
          }`}
          onClick={() => handleStyleChange({ italic: !currentCell?.style.italic })}
        >
          <Italic size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Type size={18} />
          <select
            className="border rounded p-1"
            value={currentCell?.style.fontSize || 14}
            onChange={(e) => handleStyleChange({ fontSize: Number(e.target.value) })}
          >
            {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1">
          <Palette size={18} />
          <input
            type="color"
            value={currentCell?.style.color || '#000000'}
            onChange={(e) => handleStyleChange({ color: e.target.value })}
            className="w-6 h-6 p-0 border-0"
          />
        </div>
      </div>
    </div>
  );
};