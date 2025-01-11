# React Sheets Clone

A Google Sheets clone built with React, TypeScript, and modern web technologies.

## Tech Stack and Data Structures

### Tech Stack

1. **React + TypeScript**: For building a robust and type-safe user interface
2. **Zustand**: For state management, chosen for its simplicity and performance
3. **Immer**: For immutable state updates
4. **Math.js**: For formula evaluation
5. **Tailwind CSS**: For styling
6. **Lucide React**: For icons

### Data Structures

1. **Cell Data Structure**:
```typescript
interface CellData {
  value: string;
  formula: string;
  style: CellStyle;
}
```
- `value`: The displayed value in the cell
- `formula`: The formula used to calculate the value (if any)
- `style`: Cell styling information

2. **Sheet State**:
```typescript
interface SheetState {
  cells: { [key: string]: CellData };
  selectedCell: string | null;
  selectedRange: string[] | null;
  columnWidths: { [key: string]: number };
  rowHeights: { [key: string]: number };
}
```
- Uses a map structure for O(1) cell access
- Tracks selection state for single cells and ranges
- Stores column and row dimensions

### Why These Choices?

1. **State Management**:
   - Zustand was chosen over Redux for its simplicity and reduced boilerplate
   - Immer integration makes state updates more intuitive
   - The flat state structure makes it efficient to update and access cell data

2. **Cell Storage**:
   - Using a map with cell IDs (e.g., "A1", "B2") as keys provides:
     - Fast O(1) access to any cell
     - Memory efficiency by only storing non-empty cells
     - Easy serialization for save/load functionality

3. **Formula Evaluation**:
   - Math.js provides a secure and powerful formula parser
   - Custom functions (SUM, AVERAGE, etc.) are implemented on top of the parser
   - Cell references are resolved before evaluation for accurate results

4. **UI Components**:
   - Component-based architecture for maintainability
   - Virtual rendering for performance with large datasets
   - Responsive design using Tailwind CSS

## Features

1. **Spreadsheet Interface**
   - Google Sheets-like UI
   - Cell selection and range selection
   - Formula bar
   - Styling toolbar

2. **Mathematical Functions**
   - SUM
   - AVERAGE
   - MAX
   - MIN
   - COUNT

3. **Data Quality Functions**
   - TRIM
   - UPPER
   - LOWER
   - REMOVE_DUPLICATES
   - FIND_AND_REPLACE

4. **Cell Formatting**
   - Bold
   - Italic
   - Font size
   - Text color

## Future Improvements

1. **Performance Optimization**
   - Implement virtual scrolling for large datasets
   - Optimize formula evaluation with caching
   - Add web workers for complex calculations

2. **Additional Features**
   - Cell merging
   - More formula functions
   - Data visualization
   - Collaborative editing
   - Undo/Redo functionality

3. **Data Persistence**
   - Save/load spreadsheets
   - Export to CSV/Excel
   - Auto-save functionality