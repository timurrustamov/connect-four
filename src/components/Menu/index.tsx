import * as React from 'react';
import Modal from './Modal';
import NumberOption from './NumberOption';
import { State, MatchState } from 'store/state';
import { connect } from 'react-redux';
import { changeBoardDimensions, changeMatchState } from 'store/actions';
import { bindActionCreators } from 'redux';

export type MenuProps = {
  dimensions: State['board']['dimensions'],
  isInMenu: boolean,
  startGame: () => void,
  incrementBoardWidth: () => void,
  decrementBoardWidth: () => void
}

const Menu = (props: MenuProps) => {

  const {
    isInMenu,
    dimensions,
    startGame,
    incrementBoardWidth,
    decrementBoardWidth
  } = props;

  if (!isInMenu) {
    return null;
  }
  return (
    <Modal>
      <NumberOption
        label="Width"
        maxValue={50}
        minValue={4}
        value={dimensions.gridWidth}
        onIncrement={incrementBoardWidth}
        onDecrement={decrementBoardWidth}
      />
      <button style={{ maxHeight: 50 }} onClick={startGame}>
        Start Game
      </button>
    </Modal>
  )
}

export default connect(
  (state: State) => ({
    dimensions: state.board.dimensions,
    isInMenu: state.match.state === MatchState.Menu
  }),
  (dispatch) => ({
    changeDimensions: bindActionCreators(changeBoardDimensions, dispatch),
    changeMatchState: bindActionCreators(changeMatchState, dispatch)
  }),
  (stateProps, dispatchProps) => ({
    dimensions: stateProps.dimensions,
    isInMenu: stateProps.isInMenu,
    startGame: () => dispatchProps.changeMatchState(MatchState.InGame),
    incrementBoardWidth: () => {
      const { gridWidth, gridHeight } = stateProps.dimensions;
      dispatchProps.changeDimensions(gridWidth + 1, gridHeight);
    },
    decrementBoardWidth: () => {
      const { gridWidth, gridHeight } = stateProps.dimensions;
      console.log(gridWidth);
      dispatchProps.changeDimensions(gridWidth - 1, gridHeight);
    }
  })
)(Menu)