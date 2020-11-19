import React from 'react';
import { shallow } from 'enzyme';
import ApproveMPRPage from './ApproveMPRPage';

describe('<ApproveMPRPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<ApproveMPRPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
