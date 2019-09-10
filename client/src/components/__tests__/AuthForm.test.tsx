import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthForm from '../auth/AuthForm';

test('auth form shows correct fields depending on type', () => {
  const { getByLabelText, queryByText, rerender } = render(
    <AuthForm type={'login'} />
  );
  expect(getByLabelText('Email Address')).toBeInTheDocument();
  expect(getByLabelText('Password')).toBeInTheDocument();
  // expect(queryByText('Username')).toBeUndefined();
  rerender(<AuthForm type='signup' />);
  expect(getByLabelText('Email Address')).toBeInTheDocument();
  expect(getByLabelText('Password')).toBeInTheDocument();
  expect(getByLabelText('Username')).toBeInTheDocument();
});
