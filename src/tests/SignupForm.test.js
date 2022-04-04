import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SignupForm from '../forms/SignupForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('Renders.', () => {
  const { getByText} = render(
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  );

  const buttonLabel = getByText(/Register!/);
  const label1 = getByText("Email");
  const label2 = getByText("Password");
  
  // is the text displayed?
  expect(buttonLabel).toBeInTheDocument();
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
  fireEvent.click(getByText("Register!"))
});