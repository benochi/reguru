import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SearchForm from '../forms/SearchForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('Renders.', () => {
  const { getByText} = render(
    <BrowserRouter>
      <SearchForm />
    </BrowserRouter>
  );

  const buttonLabel = getByText(/Search/);
  const label1 = getByText("Square footage:");
  const label2 = getByText("Minimum bedrooms:");
  const label3 = getByText("Minimum bathrooms:");
  const label4 = getByText("Maximum price:");
  const label5 = getByText("Minimum price:");
  
  
  // is the text displayed?
  expect(buttonLabel).toBeInTheDocument();
  expect(label1).toBeInTheDocument();
  expect(label2).toBeInTheDocument();
  expect(label3).toBeInTheDocument();
  expect(label4).toBeInTheDocument();
  expect(label5).toBeInTheDocument();
  fireEvent.click(getByText("Search"))
});