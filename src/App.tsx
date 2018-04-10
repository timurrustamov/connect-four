import * as React from 'react';
import { Provider } from 'react-redux';

import Store from '@connect-four/store';

import Root from '@connect-four/components/Root';
import Game from '@connect-four/components/Game';
import Menu from '@connect-four/components/Menu';

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Root>
          <Menu />
          <Game />
        </Root>
      </Provider>
    );
  }
}

export default App;
