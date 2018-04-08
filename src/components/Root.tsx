import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { State } from '@connect-four/store/state';
import { makeAMove } from 'store/actions';

import Board from 'components/Game/Board';
import styled from 'styled-components';

export type RootProps = {
  board: State['board'],
  makeAMove: typeof makeAMove,
  className?: string
}

const Root = (props: RootProps) => {

  return (
    <div className={props.className}>
      <Board />
    </div>
  )
}

const StyledRoot = styled(Root) `
  padding: 5%;
  background-color: #326FC8;
  border-radius: 5%;
  box-shadow: 25px 17px 44px -15px #333;
  max-width: 640px;
  @media (min-width: 700px) {
    margin: 5% auto 5% auto;
  };
`

export default connect(
  (state: State) => ({ board: state.board }),
  (dispatch) => ({
    makeAMove: bindActionCreators(makeAMove, dispatch)
  })
)(StyledRoot)