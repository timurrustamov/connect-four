import * as React from 'react';
import styled from 'styled-components';

export const NumberOptionButton = styled.button`
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 0.1rem;
  min-width: 32px;
`;
export const NumberOptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 2rem;
`;
export const NumberOptionLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 400;
  padding-right: 1.4rem;
`;

export type NumberOptionProps = {
  value: number;
  label: string;
  className?: string;
  minValue?: number;
  maxValue?: number;
  valueChanges?: (_: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

class NumberOption extends React.Component<NumberOptionProps> {
  increment = () => {
    const { valueChanges, onIncrement, value, maxValue = 4 } = this.props;
    if (value + 1 <= maxValue) {
      // tslint:disable-next-line:no-unused-expression
      valueChanges && valueChanges(value + 1);
      // tslint:disable-next-line:no-unused-expression
      onIncrement && onIncrement();
    }
  };

  decrement = () => {
    const { valueChanges, onDecrement, value, minValue = 0 } = this.props;
    if (value - 1 >= minValue) {
      // tslint:disable-next-line:no-unused-expression
      valueChanges && valueChanges(value - 1);
      // tslint:disable-next-line:no-unused-expression
      onDecrement && onDecrement();
    }
  };

  render() {
    const { children, className, label, value } = this.props;

    return (
      <NumberOptionWrapper>
        <NumberOptionLabel>{label}</NumberOptionLabel>
        <div className={className}>
          <NumberOptionButton
            onClick={this.increment}
            aria-label={`Decrement ${label}`}
          >
            ⬆
          </NumberOptionButton>
          {children ? (
            children
          ) : (
            <span style={{ textAlign: 'center' }}>{value}</span>
          )}
          <NumberOptionButton
            onClick={this.decrement}
            aria-label={`Increment ${label}`}
          >
            ⬇
          </NumberOptionButton>
        </div>
      </NumberOptionWrapper>
    );
  }
}

/**
 * Simulation of a number selection column...
 */
export default styled(NumberOption)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
