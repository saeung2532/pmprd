import React from 'react';
import { shallow } from 'enzyme';
import ApproveEPRPage from './ApproveEPRPage';

describe('<ApproveEPRPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<ApproveEPRPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
