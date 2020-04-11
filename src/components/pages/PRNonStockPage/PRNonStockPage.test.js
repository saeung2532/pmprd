import React from 'react';
import { shallow } from 'enzyme';
import PRNonStockPage from './PRNonStockPage';

describe('<PRNonStockPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<PRNonStockPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
