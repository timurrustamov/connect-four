import * as React from 'react';
import { connect } from 'react-redux';
import { MatchState, State, UserId } from '../store/state';

export type ScoreBoardProps = {
  matchState: MatchState;
  winner: UserId;
  currentPlayer: UserId;
};

const ScoreBoard = (props: ScoreBoardProps) => {
  const { matchState, currentPlayer, winner } = props;
  if (matchState === MatchState.Menu) {
    return null;
  }
  if (matchState === MatchState.InGame) {
    return <h2>Au tour du joueur {currentPlayer + 1}!</h2>;
  }
  return (
    <h1 style={{ textAlign: 'center' }}>
      {matchState === MatchState.Draw
        ? `It's a draw! 🙈`
        : `Player ${winner + 1} won!`}
    </h1>
  );
};

/**
 * Displays current game informations (invisible when not in game)
 */
export default connect((state: State) => ({
  matchState: state.match.state,
  winner: state.match.winner,
  currentPlayer: state.currentPlayer
}))(ScoreBoard);
