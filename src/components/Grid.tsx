import React from 'react';
import { Cell } from './Cell';

const COLUMNS = 26; // A to Z
const ROWS = 100;

export const Grid: React.FC = () => {
  const getColumnLabel = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="overflow-auto">
      <div className="grid" style={{ gridTemplateColumns: `auto repeat(${COLUMNS}, minmax(100px, 1fr))` }}>
        {/* Header row */}
        <div className="bg-gray-100 border border-gray-300 p-1 text-center"></div>
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={`header-${i}`} className="bg-gray-100 border border-gray-300 p-1 text-center">
            {getColumnLabel(i)}
          </div>
        ))}

        {/* Grid cells */}
        {Array.from({ length: ROWS }).map((_, row) => (
          <React.Fragment key={`row-${row}`}>
            <div className="bg-gray-100 border border-gray-300 p-1 text-center">
              {row + 1}
            </div>
            {Array.from({ length: COLUMNS }).map((_, col) => (
              <Cell
                key={`${getColumnLabel(col)}${row + 1}`}
                id={`${getColumnLabel(col)}${row + 1}`}
                row={row}
                col={col}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};