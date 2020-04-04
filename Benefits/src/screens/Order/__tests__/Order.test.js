import 'react-native';
import React from 'react';
import Order from '../Order';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Order />);
});
