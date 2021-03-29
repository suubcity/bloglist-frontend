import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

	const mockHandler = jest.fn();

	let component;

	beforeEach(() => {
		component = render(<Blog blog={blog} handleUpdateBlog={mockHandler} user={user} />);
	});

	test('renders blog title and author only', () => {
		expect(component.container).toHaveTextContent('title');
		expect(component.container).toHaveTextContent('author');

		const showWhenVisible = component.container.querySelector('.showWhenVisible');

		expect(showWhenVisible).toHaveStyle('display: none');
	});

	test('renders likes and url when view button is clicked', () => {
		const button = component.getByText('view');
		fireEvent.click(button);

		const showWhenVisible = component.container.querySelector('.showWhenVisible');

		expect(showWhenVisible).not.toHaveStyle('display: none');
	});

	test('when like button is click twice it calls event handler twice', () => {
		const button = component.container.querySelector('.likeButton');

		fireEvent.click(button);
		fireEvent.click(button);

		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});
