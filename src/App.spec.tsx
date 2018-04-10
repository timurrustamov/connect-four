import { configure, shallow } from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Game from './components/Game';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
it('should match snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('should contain a Redux state provider', () => {
  const container = shallow(<App />);
  expect(container.find(Provider)).toHaveLength(1);
});
it('should contain a Game board component', () => {
  const container = shallow(<App />);
  expect(container.find(Game)).toHaveLength(1);
});
