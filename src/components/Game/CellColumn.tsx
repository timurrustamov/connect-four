import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { makeAMove } from 'store/actions';
import { State } from 'store/state';

export type CellColumnProps = {
  columnId: number,
  children?: React.ReactNode[],
  className?: string,
  isIllegal: boolean,
  makeAMove: typeof makeAMove
}

const CellColumn = (props: CellColumnProps) => {

  const { className, children, makeAMove: play, columnId } = props;
  return (
    <div onClick={() => play(columnId)} className={className}>
      {children}
    </div>
  )
}

const StyledCellColumn = styled(CellColumn) `
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  height: 100%;
`;

export default connect(
  (state: State, ownProps: { columnId: number }) => ({
    isIllegal: !!state.illegalMoves.find(move => move.columnId === ownProps.columnId)
  }),
  (dispatch) => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
  })
)(StyledCellColumn as React.ComponentType<CellColumnProps>)