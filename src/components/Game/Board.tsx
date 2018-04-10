import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { State } from 'store/state';
import CellColumn from 'components/Game/CellColumn';
import Cell from 'components/Game/Cell';

export type BoardProps = {
  className?: string,
  board: State['board']
}

const Board = (props: BoardProps) => {

  const { className } = props;
  const { dimensions, grid } = props.board;
  const { gridHeight } = dimensions;

  return (
    <div className={className}>
      {grid
        .reduce((column: typeof grid[], cell, cellIndex) => {
          const columnId = Math.floor(cellIndex / gridHeight);
          if (!column[columnId]) {
            column[columnId] = [cell];
          } else {
            column[columnId].push(cell);
          }
          return column;
        }, [])
        .map((column, columnId) => (
          <CellColumn columnId={columnId} key={columnId}>
            {column.map((cell, cellId) => {
              const gridIndex = columnId * gridHeight + cellId;
              return (
                <Cell
                  value={grid[gridIndex]}
                  key={gridIndex}
                  gridIndex={gridIndex}
                />
              );
            })}
          </CellColumn>
        ))}
    </div>
  )
}

const StyledBoard = styled(Board) `
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* min-width: ${props => props.board.dimensions.gridWidth * 4}rem; */
  overflow: hidden;
`;

export default connect(
  (state: State) => ({ board: state.board })
)(StyledBoard)