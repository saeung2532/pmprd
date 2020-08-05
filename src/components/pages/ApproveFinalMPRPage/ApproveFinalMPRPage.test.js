import React from 'react';
import { shallow } from 'enzyme';
import ApproveFinalMPRPage from './ApproveFinalMPRPage';

describe('<ApproveFinalMPRPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<ApproveFinalMPRPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
