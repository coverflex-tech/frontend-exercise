import 'react-native';
import React from 'react';
import Signin from '../Signin';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Signin />);
});
