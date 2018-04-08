import * as React from 'react'
import styled, { keyframes } from 'styled-components';
import { UserId } from 'store/state';

const slideFromTop = keyframes`
  100% {
    transform: translate(4%, 4%);
    opacity: 1;
  }
`

type CheckerProps = {
  userId: UserId,
  className?: string
}

const Checker = (props: CheckerProps) => (
  <div className={props.className} />
)

export default styled(Checker) `
  width: 95%;
  height: 95%;
  transform: translate(4%, -200px);
  border-radius: 50%;
  background-color: ${props => props.userId ? 'blue' : 'red'};
  animation: ${slideFromTop} 0.3s ease-out forwards;
  position: absolute;
  opacity: 0;
  z-index: 100;
`;