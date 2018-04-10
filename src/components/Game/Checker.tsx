import * as React from 'react';
import { connect } from 'react-redux';
import { State, UserId } from 'store/state';
import styled, { keyframes } from 'styled-components';

const slideFromTopFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    transform: translate(4%, 4%);
    opacity: 1;
  }
`;
const slideFromTop = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
    transform: translate(4%, 4%);
  }
`;
const blink = keyframes`
  50% {
    background-color: gold;
  }
`;

type CheckerProps = {
  userId: UserId;
  className?: string;
  withinWinningSequence?: boolean;
  preview?: boolean;
  playerColors: string[];
};

const Checker = (props: CheckerProps) => <div className={props.className} />;

const StyledChecker = styled(Checker)`
  position: absolute;
  width: 95%;
  height: 95%;
  border-radius: 50%;
  z-index: 1;
  transform: ${props =>
    props.withinWinningSequence
      ? 'translate(4%, 4%)'
      : 'translate(4%, -200px)'};
  background-color: ${props => {
    const { userId, playerColors } = props;
    if (!playerColors[userId]) {
      console.warn(
        `${Checker.name}: did not found player ${userId} colors in theme!`
      );
      return 'palevioletred';
    }
    return playerColors[userId];
  }};
  animation: ${props => {
    if (props.withinWinningSequence) {
      return `${blink} 2s ease-in-out infinite`;
    }
    if (props.preview) {
      return `${slideFromTop} 1s ease-out forwards`;
    }
    return `${slideFromTopFadeIn} 0.3s ease-out forwards`;
  }};
  animation-delay: ${props => (props.preview ? '0.5s' : '')};
  opacity: ${props => (props.withinWinningSequence ? 1 : 0)};
`;

/**
 * A players checker.
 */
export default connect((state: State) => ({
  playerColors: state.theme.playerColors
}))(StyledChecker);
