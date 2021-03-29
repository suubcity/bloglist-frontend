import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

describe('<Blog />', () => {
	const blog = {
		title: 'Test Blog',
		author: 'Test Author',
		url: 'www.test.com',
		likes: 99,
		user: {
			id: '605a2cca96e2272559d65cd5',
		},
	};

	const user = { username: 'blogUser', name: 'Mr Thomas', id: '604695ca95fa8f622392a117' };

	let component;

	beforeEach(() => {
		component = render(<Blog blog={blog} user={user} />);
	});

	test('renders blog title and author', () => {
		expect(component.container).toHaveTextContent('title');
		expect(component.container).toHaveTextContent('author');

		component.debug();

		const showWhenVisible = component.container.querySelector('.showWhenVisible');

		expect(showWhenVisible).toHaveStyle('display: none');
	});
});
