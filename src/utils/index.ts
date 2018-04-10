import { BoardGrid, IndexedBoardGrid } from 'store/state';

/**
 * This function actually decides whether a player won for an arbitrary part of gameboard grid
 * @param userId User's id for grid matching
 * @param grid A part of gameboard grid (must be a column, a row, or a diagonal)
 * @param consecutiveNo Number of consecutive matches for vicory!!
 */
export function isConsecutive(userId: number, grid: BoardGrid | IndexedBoardGrid, consecutiveNo: number = 4) {

  if (consecutiveNo <= 0) {
    throw new Error(`${isConsecutive.name}: Invalid number of consecutive elements ${consecutiveNo}`);
  }
  if (grid.length <= 0) {
    return false;
  }
  if (typeof grid[0] === 'object') {
    grid = (grid as IndexedBoardGrid).map(({ value }) => value);
  }
  return ((grid as BoardGrid).reduce((acc: number, cell) => {
    return (acc >= consecutiveNo || cell === userId) ? acc + 1 : 0;
  }, 0) || 0) >= consecutiveNo;
};

/**
 * This function is a tiny (arguably useless) wrap to get a cells index in a grid
 * @param index Game grid cell index
 * @param gridHeight Game grids height
 */
export function getColumnId(index: number, gridHeight: number) {
  return Math.floor(index / gridHeight);
}
/**
 * Counterpart to getColumnId(), but for row indexes (and even more useless...uselesser? Useless.).
 * @param index Game grid cell index
 * @param gridHeight Game grids height
 */
export function getRowId(index: number, gridHeight: number) {
  return index % gridHeight;
}

/**
 * Extracts a column from Game grid.
 * @param grid A Game grid
 * @param gridHeight Game grids height
 * @param columnId Id of the column to be extracted
 */
export function extractColumnFromGrid(grid: BoardGrid, gridHeight: number, columnId: number): IndexedBoardGrid {
  return grid
    .map((value, index) => ({ value, index }))
    .filter((_, index) => getColumnId(index, gridHeight) === columnId);
}
/**
 * Extracts a row from Game grid.
 * @param grid A Game grid
 * @param gridHeight Game grids height
 * @param rowId Id of the column to be extracted
 */
export function extractRowFromGrid(grid: BoardGrid, gridHeight: number, rowId: number): IndexedBoardGrid {
  return grid
    .map((value, index) => ({ value, index }))
    .filter((_, index) => getRowId(index, gridHeight) === rowId);
}

/**
 * Extracts a rising (from bottom left to upper right) diagonal from Game grid
 * @param grid A game grid
 * @param gridHeight Game grids height
 * @param cellIndex A cell index from the diagonal to be extracted
 */
export function extractRisingDiagonal(grid: BoardGrid, gridHeight: number, cellIndex: number): IndexedBoardGrid {
  return grid
    .map((value, index) => ({ value, index }))
    .filter((_, index) => index % (gridHeight + 1) === cellIndex % (gridHeight + 1))
    .filter(({ index }) => {
      const cellColumnId = getColumnId(cellIndex, gridHeight);
      const cellRowId = getRowId(cellIndex, gridHeight);
      const columnId = getColumnId(index, gridHeight);
      const rowId = getRowId(index, gridHeight);
      return rowId - columnId === cellRowId - cellColumnId;
    });
}

/**
 * Extracts a falling (from upper left to bottom right) diagonal from Game grid
 * @param grid A game grid
 * @param gridHeight Game grids height
 * @param cellIndex A cell index from the diagonal to be extracted
 */
export function extractFallingDiagonal(grid: BoardGrid, gridHeight: number, cellIndex: number): IndexedBoardGrid {
  return grid
    .map((value, index) => ({ value, index }))
    .filter((_, index) => index % (gridHeight - 1) === cellIndex % (gridHeight - 1))
    .filter(({ index }) => {
      const cellColumnId = getColumnId(cellIndex, gridHeight);
      const cellRowId = getRowId(cellIndex, gridHeight);
      const columnId = getColumnId(index, gridHeight);
      const rowId = getRowId(index, gridHeight);
      return rowId + columnId === cellRowId + cellColumnId;
    })
}

export let _logEverythingAboutACell: (grid: BoardGrid, gridHeight: number, cellIndex: number) => void;
if (process.env.NODE_ENV === 'development') {
  (() => {
    _logEverythingAboutACell = (grid, gridHeight, cellIndex) => {
      const columnId = getColumnId(cellIndex, gridHeight);
      const rowId = getRowId(cellIndex, gridHeight);
      console.log(
        `For cell ${cellIndex} (${rowId}, ${columnId}):\n`,
        '\nColumn:', extractColumnFromGrid(grid, gridHeight, columnId),
        '\nRow:', extractRowFromGrid(grid, gridHeight, rowId),
        '\nRising diagonal:', extractRisingDiagonal(grid, gridHeight, cellIndex),
        '\nFalling diagonal:', extractFallingDiagonal(grid, gridHeight, cellIndex)
      );
    }
  })();
} else {
  // tslint:disable-next-line:no-empty
  _logEverythingAboutACell = () => { };
}