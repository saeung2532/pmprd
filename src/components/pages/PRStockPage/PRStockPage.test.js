import React from 'react';
import { shallow } from 'enzyme';
import PRStockPage from './PRStockPage';

describe('<PRStockPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<PRStockPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
