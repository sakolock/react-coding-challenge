import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Page from './page';
import { APP_TITLE } from '../../Constants';

describe('Page', () => {
  afterEach(cleanup);

  it('renders the app title', () => {
    const { getByText } = render(<Page />);

    expect(getByText(APP_TITLE)).not.toBeNull();
  });

  it('renders a "MessageList" component', () => {
    const { getByTestId } = render(<Page />);

    expect(getByTestId('message-list')).not.toBeNull();
  });
});
