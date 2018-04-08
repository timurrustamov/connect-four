import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { makeAMove } from '@connect-four/store/actions';
import Checker from './Checker';
import { State, UserId } from 'store/state';

type CellProps = {
  makeAMove: typeof makeAMove,
  gridIndex: number,
  value?: UserId,
  columnId: number,
  rowId: number,
  boardWidth: number,
  boardHeight: number,
  className?: string,
  isIllegal?: boolean
}

type CellContentsProps = {
  children?: React.ReactChild,
  className?: string,
  isIllegal?: boolean
}

const CellContents = (props: CellContentsProps) => (
  <div className={props.className}>
    {props.children}
  </div>
)
const StyledCellContents = styled(CellContents) `
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  color: palevioletred;
  font-weight: bold;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: inset 0.5rem 0.5rem 0.1rem 0px rgba(0,0,0,0.75);
  &:hover {
    background-color: #aaa;
  };
`

const Cell = (props: CellProps) => {

  return (
    <div onClick={() => console.log(props)} className={props.className}>
      <StyledCellContents isIllegal={props.isIllegal}>
        {typeof props.value !== 'undefined' ?
          <Checker userId={props.value} /> : undefined
        }
      </StyledCellContents>
    </div>
  )
}

export const StyledCell = styled(Cell) `
  display: inline-block;
  position: relative;
  border: 10px solid #326FC8;
  background-color: white;
  border-radius: 50%;
  &:after {
    padding-top: 100%;
    display: block;
    content: '';
  }
`;

export default connect(
  (state: State) => ({
    boardWidth: state.board.options.boardWidth,
    boardHeight: state.board.options.boardHeight
  }),
  (dispatch) => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
  })
)(StyledCell)