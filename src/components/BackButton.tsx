import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { changeMatchState } from '../store/actions';
import { MatchState, State } from '../store/state';

export type ScoreBoardProps = {
  className?: string;
  canQuit: boolean;
  backToMenu: () => void;
};

const Button = styled.button`
  min-width: 80px;
  min-height: 80px;
  border-radius: 50%;
  font-size: 2rem;
  background-color: white;
  border: 1px solid blue;
`;

const BackButton = (props: ScoreBoardProps) => {
  const { className, canQuit, backToMenu } = props;

  if (!canQuit) {
    return null;
  }
  return (
    <div className={className}>
      <Button aria-label="Back to menu" onClick={backToMenu}>
        🔙
      </Button>
    </div>
  );
};

const StyledBackButton = styled(BackButton)`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  margin: 24px;
`;

/**
 * Allows to return to menu when clicked
 */
export default connect(
  (state: State) => ({
    canQuit: state.match.state !== MatchState.Menu
  }),
  dispatch => ({
    changeMatchState: bindActionCreators(changeMatchState, dispatch)
  }),
  (ownState, dispatchProps) => ({
    canQuit: ownState.canQuit,
    backToMenu: () => {
      dispatchProps.changeMatchState(MatchState.Menu);
    }
  })
)(StyledBackButton);
