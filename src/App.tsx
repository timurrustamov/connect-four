import * as React from 'react';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import BackButton from './components/BackButton';
import Game from './components/Game';
import Menu from './components/Menu';
import Root from './components/Root';
import ScoreBoard from './components/ScoreBoard';
import Store from './store';

/**
 * Application main component
 */
class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Root>
          <Menu />
          <BackButton />
          <ScoreBoard />
          <Game />
        </Root>
      </Provider>
    );
  }
}

export default App;
