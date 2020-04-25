import React from 'react';
import { shallow } from 'enzyme';
import ConfirmPRPage from './ConfirmPRPage';

describe('<ConfirmPRPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<ConfirmPRPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
