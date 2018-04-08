import * as React from 'react';
import { Provider } from 'react-redux';

import Store from '@connect-four/store';

import Root from '@connect-four/components/Root';

import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Root />
        </div>
      </Provider>
    );
  }
}

export default App;
