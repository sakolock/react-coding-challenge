import React from 'react';
import { fireEvent, render, cleanup, wait } from '@testing-library/react';
import { MessageList } from '../message-list';
import { MESSAGE_PRIORITY_MAPPING, ERROR_PRIORITY } from '../../Common/Constants';

describe('message-list', () => {
  const messagePriorityLevels = Object.keys(MESSAGE_PRIORITY_MAPPING);

  afterEach(cleanup);

  describe('the "STOP" button', () => {
    it('stops the api from sending more messages when clicked', async () => {
      const { getByText, queryAllByTestId, unmount } = render(<MessageList />, { container: document.body });

      expect(getByText('Stop')).not.toBeNull();

      const totalMessages = queryAllByTestId('message').length;

      fireEvent.click(getByText('Stop'));

      await wait(() => expect(queryAllByTestId('message').length).toEqual(totalMessages), { timeout: 3000 });
      unmount();
    });

    it('toggles to "START" when clicked', () => {
      const { getByText, queryByText, unmount } = render(<MessageList />, { container: document.body });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));

      expect(getByText('Start')).not.toBeNull();
      expect(queryByText('Stop')).toBeNull();
      unmount();
    });
  });

  describe('the "START" button', () => {
    it('only shows when the "STOP" button is toggled', () => {
      const { getByText, queryByText, queryAllByTestId, unmount } = render(<MessageList />, {
        container: document.body
      });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));

      expect(getByText('Start')).not.toBeNull();

      unmount();
    });

    it('starts the api and begins sending more messages when clicked', async () => {
      const { getByText, queryByText, queryAllByTestId, unmount } = render(<MessageList />, {
        container: document.body
      });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));

      expect(getByText('Start')).not.toBeNull();

      const totalMessages = queryAllByTestId('message').length;

      await wait(() => expect(queryAllByTestId('message').length).toEqual(totalMessages), { timeout: 3000 });

      unmount();
    });

    it('toggles to "STOP" when clicked', () => {
      const { getByText, queryByText, unmount } = render(<MessageList />, { container: document.body });

      expect(queryByText('Start')).toBeNull();

      fireEvent.click(getByText('Stop'));
      fireEvent.click(getByText('Start'));

      expect(getByText('Stop')).not.toBeNull();
      expect(queryByText('Start')).toBeNull();

      unmount();
    });
  });

  describe('the "CLEAR" button', () => {
    it('renders', () => {
      const { getByTestId, unmount } = render(<MessageList />, {
        container: document.body
      });

      expect(getByTestId('clear-all')).not.toBeNull();

      unmount();
    });
    it('clears all messages when clicked', () => {
      const { getByTestId, queryAllByTestId, unmount } = render(<MessageList />, {
        container: document.body
      });
      const totalMessages = queryAllByTestId('message').length;

      expect(totalMessages).toBeGreaterThan(0);

      fireEvent.click(getByTestId('clear-all'));

      expect(queryAllByTestId('message').length).toEqual(0);

      unmount();
    });
  });

  describe('the messages section', () => {
    messagePriorityLevels.forEach(priority => {
      it(`contains a column for "${MESSAGE_PRIORITY_MAPPING[priority]} Type ${priority}"`, () => {
        const { getByText, unmount } = render(<MessageList />, {
          container: document.body
        });

        expect(getByText(`${MESSAGE_PRIORITY_MAPPING[priority]} Type ${priority}`)).not.toBeNull();
      });
    });

    it(`has counters for each of ${messagePriorityLevels.length} columns`, () => {
      const { getAllByText, unmount } = render(<MessageList />, {
        container: document.body
      });

      expect(getAllByText(/Count.*/).length).toEqual(Object.keys(MESSAGE_PRIORITY_MAPPING).length);
    });
  });

  describe('messages', () => {
    it('adds new messages to the top of their columns', () => false);
    it('sorts new messages', () => false);
    it(`shows an alert for new "${MESSAGE_PRIORITY_MAPPING[ERROR_PRIORITY]}" messages`, () => false);
  });
  // describe(`when there is a message with priority ${ERROR_PRIORITY}`, () => {
  //     it(`renders a "PageAlert"`, () => {
  //         const { getByTestId } = render( < MessageList / > );
  //         expect(getByTestId('page-alert')).toBeVisible();
  //     });
  // });
});
