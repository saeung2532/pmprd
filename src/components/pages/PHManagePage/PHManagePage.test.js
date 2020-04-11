import React from 'react';
import { shallow } from 'enzyme';
import PHManagePage from './PHManagePage';

describe('<PHManagePage />', () => {
  test('renders', () => {
    const wrapper = shallow(<PHManagePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
