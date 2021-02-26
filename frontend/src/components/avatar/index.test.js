import { render } from '@testing-library/react';
import { useRecoilValue } from 'recoil';

import UserAvatar from './index';

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useRecoilValue: jest.fn()
}));

test('renders the normal UserAvatar component', () => {
	useRecoilValue.mockReturnValue('test');

	const { container } = render(<UserAvatar />);

	expect(container.firstChild).toMatchSnapshot();
});
