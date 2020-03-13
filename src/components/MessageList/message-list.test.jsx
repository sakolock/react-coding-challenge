import React from 'react';
import { fireEvent, render, cleanup, wait, waitForElement, within } from '@testing-library/react';
import { MessageList } from './message-list';
import { MESSAGE_PRIORITY_MAPPING, ERROR_PRIORITY, TEST_IDS } from '../../Constants';

describe('MessageList', () => {
  const messagePriorityLevels = Object.keys(MESSAGE_PRIORITY_MAPPING);

  afterEach(() => {
    cleanup();
  });

  describe('the "STOP" button', () => {
    it('stops the api from sending more messages when clicked', async () => {
      const { getByText, queryAllByTestId } = render(<MessageList />, { container: document.body });

      expect(getByText('Stop')).not.toBeNull();

      const totalMessages = queryAllByTestId(/message-[error|info|warning]/).length;

      fireEvent.click(getByText('Stop'));

      await wait(() => expect(queryAllByTestId(/message-[error|info|warning]/).length).toEqual(totalMessages), {
        timeout: 3000
      });
    });

    it('toggles to "START" when clicked', () => {
      const { getByText, queryByText } = render(<MessageList />, { container: document.body });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));

      expect(getByText('Start')).not.toBeNull();
      expect(queryByText('Stop')).toBeNull();
    });
  });

  describe('the "START" button', () => {
    it('only shows when the "STOP" button is toggled', () => {
      const { getByText, queryByText } = render(<MessageList />, {
        container: document.body
      });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));

      expect(getByText('Start')).not.toBeNull();
    });

    it('starts the api and begins sending more messages when clicked', async () => {
      const { getByText, queryByText, queryAllByTestId } = render(<MessageList />, {
        container: document.body
      });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));

      expect(getByText('Start')).not.toBeNull();

      const totalMessages = queryAllByTestId(/message-[error|info|warning]/).length;

      await wait(() => expect(queryAllByTestId(/message-[error|info|warning]/).length).toEqual(totalMessages), {
        timeout: 3000
      });
    });

    it('toggles to "STOP" when clicked', () => {
      const { getByText, queryByText } = render(<MessageList />, { container: document.body });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));
      fireEvent.click(getByText('Start'));

      expect(getByText('Stop')).not.toBeNull();
      expect(queryByText('Start')).toBeNull();
    });
  });

  describe('the "CLEAR" button', () => {
    it('renders', () => {
      const { getByTestId } = render(<MessageList />, {
        container: document.body
      });

      expect(getByTestId(TEST_IDS.messageList.clearAllButton)).not.toBeNull();
    });

    it('clears all messages when clicked', async () => {
      const { getByTestId, queryAllByTestId, getAllByTestId } = render(<MessageList />, {
        container: document.body
      });

      await waitForElement(() => getAllByTestId(/message-[error|info|warning]/));
      const totalMessages = getAllByTestId(/message-[error|info|warning]/).length;

      expect(totalMessages).toBeGreaterThan(0);

      fireEvent.click(getByTestId(TEST_IDS.messageList.clearAllButton));

      expect(queryAllByTestId(/message-[error|info|warning]/).length).toEqual(0);
    });
  });

  describe('the messages section', () => {
    messagePriorityLevels.forEach(priority => {
      it(`contains a column for "${MESSAGE_PRIORITY_MAPPING[priority]} Type ${priority}"`, () => {
        const { getByText } = render(<MessageList />, {
          container: document.body
        });

        expect(getByText(`${MESSAGE_PRIORITY_MAPPING[priority]} Type ${priority}`)).not.toBeNull();
      });

      it(`has an accurate counter for the number of ${MESSAGE_PRIORITY_MAPPING[priority]} messages`, async () => {
        const { getByText, getByTestId, queryAllByTestId } = render(<MessageList />, {
          container: document.body
        });

        // Just want to ensure no addt'l messages break test wrongly
        await (() => fireEvent.click(getByText('Stop')), { timeout: 5000 });

        const totalMessages = queryAllByTestId(`message-${MESSAGE_PRIORITY_MAPPING[priority]}`).length;

        expect(
          within(getByTestId(`${MESSAGE_PRIORITY_MAPPING[priority]}-count`)).getByText(`Count ${totalMessages}`)
        ).not.toBeNull();
      });
    });
  });

  describe('an individual message', () => {
    it('is removed when the user clicks "Clear" in that message', async () => {
      const { getByText, getByTestId, queryByTestId } = render(<MessageList />, {
        container: document.body
      });

      const message = await waitForElement(() => getByTestId(/message-[error|info|warning]/));
      const messageId = message.querySelector('[data-testid]').dataset['testid'];

      fireEvent.click(within(message).getByText('Clear'));

      expect(queryByTestId(messageId)).toBeNull();
    });
  });
});
