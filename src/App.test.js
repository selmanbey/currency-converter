// TODO: Proper test coverage is needed

import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component', () => {

  const app = mount(<App/>);

  it('renders a form', () => { expect(app.find('form').length).toEqual(1) })

  it('renders results area', () => { expect(app.find('div.res-wrapper').length).toEqual(1) })

  it('loads base currency and value on render', () => {
    expect(app.find('select').instance().value).toBe("EUR")
    expect(app.find('input').instance().value).toBe("1")
  })

})