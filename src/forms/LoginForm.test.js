import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('Renders.', () => {
  const { getByText} = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );

  const buttonLabel = getByText(/Login!/);
  const label1 = getByText("Username");
  const label2 = getByText("Password");
  
  // is the text displayed?
  expect(buttonLabel).toBeInTheDocument();
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
  fireEvent.click(getByText("Login!"))

  screen.debug();
});