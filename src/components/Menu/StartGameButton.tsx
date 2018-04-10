import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from 'store/state';
import styled from 'styled-components';

export type StartGameButtonProps = {
  backgroundColor: string;
  primaryColor: string;
  borderColor: string;
  dispatch: Dispatch<{}>;
} & React.HTMLProps<HTMLButtonElement>;

const StartGameButton = (props: StartGameButtonProps) => {
  const {
    backgroundColor,
    primaryColor,
    borderColor,
    dispatch,
    ...other
  } = props;

  return <button {...other} />;
};

const StyledStartGameButton = styled(StartGameButton)`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.primaryColor};
  border: 1px solid ${props => props.borderColor};
  font-size: 1.4rem;
  min-width: 200px;
  min-height: 80px;
`;

export default connect(({ theme }: State) => ({
  backgroundColor: theme.boardBackgroundColor,
  primaryColor: theme.playerColors[0] || '#eee',
  borderColor: theme.playerColors[1] || '#333'
}))(StyledStartGameButton);
