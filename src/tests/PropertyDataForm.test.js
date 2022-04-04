import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropertyDataForm from '../forms/PropertyDataForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('Renders.', () => {
  let value = {'price': 1000}
  const { getByText} = render(
    <BrowserRouter>
      <PropertyDataForm value={value}/>
    </BrowserRouter>
  );

  const buttonLabel = getByText(/Calculate data/);
  const label1 = getByText("Enter Expenses in dollars:");
  const label2 = getByText("Enter Taxes in dollars:");
  const label3 = getByText("Enter amount owed on properties in dollars:");
  
  // is the text displayed?
  expect(buttonLabel).toBeInTheDocument();
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
  expect(label3).toBeInTheDocument();
  fireEvent.click(getByText("Calculate data"))

});