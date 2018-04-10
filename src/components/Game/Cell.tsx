import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { makeAMove } from '../../store/actions';
import { MatchState, State, UserId } from '../../store/state';
import CellContents from './CellContents';
import Checker from './Checker';

type CellProps = {
  makeAMove: typeof makeAMove;
  gridIndex: number;
  value: UserId | null;
  className?: string;
  withinWinningSequence: boolean;
  backgroundColor: string;
  preview?: boolean;
  currentPlayer: UserId;
  isInGame: boolean;
};

const Cell = (props: CellProps) => {
  const {
    className,
    value,
    withinWinningSequence,
    preview,
    currentPlayer,
    isInGame
  } = props;

  return (
    <div className={className}>
      <CellContents>
        {(() => {
          if (value !== null) {
            return (
              <Checker
                withinWinningSequence={withinWinningSequence}
                userId={value}
              />
            );
          }
          if (preview && isInGame) {
            return <Checker preview={preview} userId={currentPlayer} />;
          }
          return null;
        })()}
      </CellContents>
    </div>
  );
};

export const StyledCell = styled(Cell)`
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

/**
 * A single Cell, wrapper to the players Checker (alias CellContents)
 */
export default connect(
  (state: State, ownProps: Partial<CellProps>) => ({
    withinWinningSequence:
      state.match.winningSequence &&
      !!state.match.winningSequence.find(
        cell => cell.index === ownProps.gridIndex
      ),
    backgroundColor: state.theme.boardBackgroundColor,
    currentPlayer: state.currentPlayer,
    isInGame: state.match.state === MatchState.InGame
  }),
  dispatch => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
  })
)(StyledCell);
