import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../store/state';
import CellColumn from './CellColumn';

export type BoardProps = {
  className?: string;
  board: State['board'];
};

const Board = (props: BoardProps) => {
  const { className } = props;
  const { dimensions } = props.board;
  const { gridWidth } = dimensions;

  return (
    <div className={className}>
      {Array(gridWidth)
        .fill(null)
        .map((_, columnId) => (
          <CellColumn key={columnId} columnId={columnId} />
        ))}
    </div>
  );
};

const StyledBoard = styled(Board)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
`;

/**
 * The game board
 */
export default connect((state: State) => ({ board: state.board }))(StyledBoard);
