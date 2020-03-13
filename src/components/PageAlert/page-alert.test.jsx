import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { PageAlert } from './page-alert';
import { TEST_IDS } from '../../Constants';

describe('PageAlert', () => {
  let props;
  beforeEach(() => {
    props = {
      id: '1234-2423-15sd-asd2',
      message: `I'm out of queso`,
      handleCloseClick: () => {}
    };
  });

  afterEach(cleanup);

  it('renders', () => {
    const { getByText, getByTestId } = render(<PageAlert {...props} />);

    expect(getByTestId(TEST_IDS.pageAlert.component)).not.toBeNull();
    expect(getByText(props.message)).not.toBeNull();
    expect(getByTestId(TEST_IDS.pageAlert.closeButton)).not.toBeNull();
  });

  it('calls "props.handleCloseClick" when "Clear" is clicked', () => {
    const spy = jest.spyOn(props, 'handleCloseClick');

    const { getByTestId } = render(<PageAlert {...props} />);

    fireEvent.click(getByTestId(TEST_IDS.pageAlert.closeButton));

    expect(spy).toHaveBeenCalled();
  });
});
