import React from 'react';
import { render, fireEvent, waitForElement } from 'test-utils';
import UserAvatar from '../ui/UserAvatar';

test('shows avatar with correct letter', () => {
  const userName = 'Tony';
  const darkMode = true;

  const { queryByText } = render(
    <UserAvatar username={userName} darkMode={darkMode} />
  );

  expect(queryByText('A')).toBe(null);
});
