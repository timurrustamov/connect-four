import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { makeAMove } from '../../store/actions';
import { IndexedBoardGrid, State } from '../../store/state';
import {
  extractColumnFromGrid,
  getFirstAvailableCellInGrid
} from '../../utils';
import Cell from './Cell';

export type CellColumnProps = {
  columnId: number;
  className?: string;
  makeAMove: typeof makeAMove;
  column: IndexedBoardGrid;
};

export type CellColumnState = {
  hovered?: boolean;
};

class CellColumn extends React.Component<CellColumnProps, CellColumnState> {
  state: CellColumnState = {
    hovered: false
  };

  onMouseEnter = () => {
    this.setState(state => ({ hovered: true }));
  };

  onMouseLeave = () => {
    this.setState(state => ({ hovered: false }));
  };

  render() {
    const { className, makeAMove: play, columnId, column } = this.props;
    const firstAvailableCellId = getFirstAvailableCellInGrid(column);

    return (
      <div
        className={className}
        onClick={() => play(columnId)}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {column.map((cell, index) => (
          <Cell
            key={cell.index}
            preview={firstAvailableCellId === index && this.state.hovered}
            gridIndex={cell.index}
            value={cell.value}
          />
        ))}
      </div>
    );
  }
}

const StyledCellColumn = styled(CellColumn)`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  height: 100%;
`;

/**
 * Renders a cell column with it's contents
 */
export default connect(
  ({ board }: State, { columnId = 0 }: Partial<CellColumnProps>) => ({
    column: extractColumnFromGrid(
      board.grid,
      board.dimensions.gridHeight,
      columnId
    )
  }),
  dispatch => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
  })
)(StyledCellColumn);
