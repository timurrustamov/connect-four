import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { State } from 'store/state';

type CellContentsProps = {
  shadowColor: string,
  backgroundColor: string,
  onHoverBackgroundColor: string,
  children?: React.ReactChild,
  className?: string,
  isIllegal?: boolean
}

const CellContents = (props: CellContentsProps) => (
  <div className={props.className}>
    {props.children}
  </div>
)
const StyledCellContents = styled(CellContents) `
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  color: palevioletred;
  font-weight: bold;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor};
  box-shadow: inset 0.5rem 0.5rem 0.1rem 0px ${props => props.shadowColor};
  &:hover {
    background-color: ${props => props.onHoverBackgroundColor};
  };
`

export default connect(
  (state: State) => ({
    backgroundColor: state.theme.boardHolesColor,
    shadowColor: state.theme.boardHolesShadowColor,
    onHoverBackgroundColor: state.theme.boardHolesOnHoverColor
  })
)(StyledCellContents);