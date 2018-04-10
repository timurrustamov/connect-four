import styled from 'styled-components';

/**
 * Small modal simulation (please don't judge me).
 */
export default styled.div`
  position: absolute;
  display: flex;
  background: #ccc;
  border: 1px solid #333;
  min-width: 80vw;
  min-height: 60vh;
  max-width: 95vw;
  max-height: 95vh;
  z-index: 1;
  @media (min-width: 700px) {
    min-width: 40vw;
  }
`;
