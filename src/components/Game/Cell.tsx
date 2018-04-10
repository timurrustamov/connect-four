import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CellContents from './CellContents'

import { makeAMove } from '@connect-four/store/actions';
import Checker from './Checker';
import { State, UserId } from 'store/state';

type CellProps = {
  makeAMove: typeof makeAMove,
  gridIndex: number,
  value?: UserId,
  className?: string,
  withinWinningSequence: boolean,
  backgroundColor: string
}

const Cell = (props: CellProps) => {

  return (
    <div className={props.className}>
      <CellContents>
        {typeof props.value !== 'undefined' ?
          <Checker
            withinWinningSequence={props.withinWinningSequence}
            userId={props.value}
          />
          : undefined
        }
      </CellContents>
    </div>
  )
}

export const StyledCell = styled(Cell) `
  display: inline-block;
  position: relative;
  border: 0.2rem solid ${props => props.backgroundColor};
  background-color: white;
  border-radius: 50%;
  &:after {
    padding-top: 100%;
    display: block;
    content: '';
  }
`;

export default connect(
  (state: State, ownProps: Partial<CellProps>) => ({
    withinWinningSequence: (
      state.match.winningSequence &&
      !!state.match.winningSequence.find(cell => cell.index === ownProps.gridIndex)
    ),
    backgroundColor: state.theme.boardBackgroundColor
  }),
  (dispatch) => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
  })
)(StyledCell)