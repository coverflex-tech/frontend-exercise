import { render } from '@testing-library/react';
import { useRecoilValue } from 'recoil';

import User from './index';

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useRecoilValue: jest.fn()
}));

test('renders the normal User Page', () => {
	useRecoilValue.mockReturnValue('test');

	const { container } = render(<User />);

	expect(container.firstChild).toMatchSnapshot();
});
