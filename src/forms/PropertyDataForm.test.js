import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropertyDataForm from './PropertyDataForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('Renders.', () => {
  const { getByText} = render(
    <BrowserRouter>
      <PropertyDataForm />
    </BrowserRouter>
  );

  const buttonLabel = getByText(/Calculate data/);
  const label1 = getByText("Taxes:");
  const label2 = getByText("Expenses:");
  const label3 = getByText("Owed:");
  
  // is the text displayed?
  expect(buttonLabel).toBeInTheDocument();
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
  expect(label3).toBeInTheDocument();
  fireEvent.click(getByText("Calculate data"))

  screen.debug();
});