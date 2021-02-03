import React from 'react';
import { shallow } from 'enzyme';
import InspectPage from './InspectPage';

describe('<InspectPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<InspectPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
