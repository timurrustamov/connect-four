import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import {
  changeBoardDimensions,
  changeMatchState,
  changeTheme,
  setOptions
} from '../../store/actions';
import { MatchState, State, Theme } from '../../store/state';
import themes from '../../utils/themes';
import Modal from './Modal';
import NumberOption from './NumberOption';
import StartGameButton from './StartGameButton';

const MenuWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const MenuLine = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export type MenuProps = {
  dimensions: State['board']['dimensions'];
  options: State['options'];
  isInMenu: boolean;
  themeId: number;
  startGame: () => void;
  incrementBoardWidth: () => void;
  decrementBoardWidth: () => void;
  incrementBoardHeight: () => void;
  decrementBoardHeight: () => void;
  decrementNumberOfPlayers: () => void;
  incrementNumberOfPlayers: () => void;
  setTheme: (theme: Theme) => void;
  className?: string;
};

const Menu = (props: MenuProps) => {
  const {
    isInMenu,
    dimensions,
    options,
    startGame,
    themeId,
    incrementBoardWidth,
    decrementBoardWidth,
    incrementBoardHeight,
    decrementBoardHeight,
    incrementNumberOfPlayers,
    decrementNumberOfPlayers,
    setTheme,
    className
  } = props;

  if (!isInMenu) {
    return null;
  }
  return (
    <MenuWrapper>
      <Modal className={className}>
        <MenuLine style={{ flex: 1.5 }}>
          <h1 style={{ textAlign: 'center' }}>Connect-four!</h1>
        </MenuLine>
        <MenuLine style={{ flex: 1.5 }}>
          <NumberOption
            label="Width"
            maxValue={50}
            minValue={4}
            value={dimensions.gridWidth}
            onIncrement={incrementBoardWidth}
            onDecrement={decrementBoardWidth}
          />
          <NumberOption
            label="Height"
            maxValue={50}
            minValue={4}
            value={dimensions.gridHeight}
            onIncrement={incrementBoardHeight}
            onDecrement={decrementBoardHeight}
          />
          <NumberOption
            label="Players"
            maxValue={4}
            minValue={2}
            value={options.players}
            onIncrement={incrementNumberOfPlayers}
            onDecrement={decrementNumberOfPlayers}
          />
          <NumberOption
            label="Theme"
            maxValue={themes.length + 1}
            minValue={1}
            value={themeId + 1}
            onIncrement={() => {
              const nextThemeId = (themeId + 1) % themes.length;
              setTheme({ ...themes[nextThemeId], id: nextThemeId });
            }}
            onDecrement={() => {
              const nextThemeId = (themeId - 1) % themes.length;
              setTheme({ ...themes[nextThemeId], id: nextThemeId });
            }}
          />
        </MenuLine>
        <MenuLine>
          <StartGameButton onClick={startGame}>Start Game!</StartGameButton>
        </MenuLine>
      </Modal>
    </MenuWrapper>
  );
};

const StyledMenu = styled(Menu)`
  display: flex;
  flex: 1;
  flex-direction: column;
  z-index: 2;
`;

/**
 * The f*cking huge menu itself!
 * Displays the title, allows to change game options and to start the game.
 */
export default connect(
  (state: State) => ({
    dimensions: state.board.dimensions,
    options: state.options,
    isInMenu: state.match.state === MatchState.Menu,
    themeId: state.theme.id
  }),
  dispatch => ({
    changeDimensions: bindActionCreators(changeBoardDimensions, dispatch),
    changeMatchState: bindActionCreators(changeMatchState, dispatch),
    setOptions: bindActionCreators(setOptions, dispatch),
    changeTheme: bindActionCreators(changeTheme, dispatch)
  }),
  (stateProps, dispatchProps) => ({
    ...stateProps,
    startGame: () => {
      dispatchProps.changeMatchState(MatchState.InGame);
    },
    incrementBoardWidth: () => {
      const { gridWidth, gridHeight } = stateProps.dimensions;
      dispatchProps.changeDimensions(gridWidth + 1, gridHeight);
    },
    decrementBoardWidth: () => {
      const { gridWidth, gridHeight } = stateProps.dimensions;
      console.log(gridWidth);
      dispatchProps.changeDimensions(gridWidth - 1, gridHeight);
    },
    incrementBoardHeight: () => {
      const { gridWidth, gridHeight } = stateProps.dimensions;
      dispatchProps.changeDimensions(gridWidth, gridHeight + 1);
    },
    decrementBoardHeight: () => {
      const { gridWidth, gridHeight } = stateProps.dimensions;
      dispatchProps.changeDimensions(gridWidth, gridHeight - 1);
    },
    incrementNumberOfPlayers: () => {
      dispatchProps.setOptions({ players: stateProps.options.players + 1 });
    },
    decrementNumberOfPlayers: () => {
      dispatchProps.setOptions({ players: stateProps.options.players - 1 });
    },
    setTheme: (theme: Theme) => {
      dispatchProps.changeTheme(theme);
    }
  })
)(StyledMenu);
