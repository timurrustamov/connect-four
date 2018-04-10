import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { makeAMove } from '../../store/actions';
import { MatchState, State } from '../../store/state';
import Board from './Board';

export type RootProps = {
  board: State['board'];
  isInGame: boolean;
  backgroundColor: string;
  shadowColor: string;
  makeAMove: typeof makeAMove;
  className?: string;
};

const Root = (props: RootProps) => {
  return (
    <div className={props.className}>
      <Board />
    </div>
  );
};

const StyledRoot = styled(Root)`
  padding: 1rem;
  background-color: ${props => props.backgroundColor};
  border-radius: 10%;
  box-shadow: 25px 17px 44px -15px ${props => props.shadowColor};
  width: 100%;
  overflow: scroll;
  max-width: 720px;
  margin: 5% auto 5% auto;
  filter: ${props => (props.isInGame ? '' : 'blur(5px)')};
  @media (max-width: 700px) {
    margin: 5%;
  }
`;

/**
 * The game board with everything included!
 */
export default connect(
  (state: State) => ({
    board: state.board,
    backgroundColor: state.theme.boardBackgroundColor,
    shadowColor: state.theme.boardBackgroundShadowColor,
    isInGame: state.match.state !== MatchState.Menu
  }),
  dispatch => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
  })
)(StyledRoot);
