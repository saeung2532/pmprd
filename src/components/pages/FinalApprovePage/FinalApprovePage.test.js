import React from 'react';
import { shallow } from 'enzyme';
import FinalApprovePage from './FinalApprovePage';

describe('<FinalApprovePage />', () => {
  test('renders', () => {
    const wrapper = shallow(<FinalApprovePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
