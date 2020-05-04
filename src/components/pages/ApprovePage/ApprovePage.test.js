import React from 'react';
import { shallow } from 'enzyme';
import ApprovePage from './ApprovePage';

describe('<ApprovePage />', () => {
  test('renders', () => {
    const wrapper = shallow(<ApprovePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
