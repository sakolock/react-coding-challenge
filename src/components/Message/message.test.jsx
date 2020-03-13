import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Message } from './message';

describe('Message', () => {
  let props;
  beforeEach(() => {
    props = {
      id: '1234-2423-15sd-asd2',
      message: `I'm out of queso`,
      priority: 1,
      handleClearClick: () => {}
    };
  });

  afterEach(cleanup);

  it('renders', () => {
    const { getByText, getByTestId } = render(<Message {...props} />);

    expect(getByText(props.message)).not.toBeNull();
    expect(getByText('Clear')).not.toBeNull();
  });

  it('calls "props.handleClearClick" when "Clear" is clicked', () => {
    const spy = jest.spyOn(props, 'handleClearClick');

    const { getByText } = render(<Message {...props} />);

    fireEvent.click(getByText('Clear'));

    expect(spy).toHaveBeenCalled();
  });
});
