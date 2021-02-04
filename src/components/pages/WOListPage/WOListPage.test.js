import React from 'react';
import { shallow } from 'enzyme';
import WOListPage from './WOListPage';

describe('<WOListPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<WOListPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
