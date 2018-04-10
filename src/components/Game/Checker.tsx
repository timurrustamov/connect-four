import * as React from 'react'
import styled, { keyframes } from 'styled-components';
import { UserId, State } from 'store/state';
import { connect } from 'react-redux';

const slideFromTop = keyframes`
  100% {
    transform: translate(4%, 4%);
    opacity: 1;
  }
`
const blink = keyframes`
  50% {
    background-color: gold;
  }
`

type CheckerProps = {
  userId: UserId,
  className?: string,
  withinWinningSequence?: boolean,
  playerColors: string[]
}

const Checker = (props: CheckerProps) => (
  <div className={props.className} />
)

const StyledChecker = styled(Checker) `
  position: absolute;
  width: 95%;
  height: 95%;
  border-radius: 50%;
  z-index: 1;
  transform: ${props => props.withinWinningSequence ? 'translate(4%, 4%)' : 'translate(4%, -200px)'};
  background-color: ${props => {
    const { userId, playerColors } = props;
    if (!playerColors[userId]) {
      console.warn(`${Checker.name}: did not found player ${userId} colors in theme!`);
      return 'palevioletred';
    }
    return playerColors[userId];
  }};
  animation: ${props => props.withinWinningSequence ?
    `${blink} 2s ease-in-out infinite` : `${slideFromTop} 0.3s ease-out forwards`
  };
  opacity: ${props => props.withinWinningSequence ? '1' : '0'};
`;

export default connect(
  (state: State) => ({
    playerColors: state.theme.playerColors
  })
)(StyledChecker);