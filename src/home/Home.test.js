import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from "./Home";
import { render, screen,} from '@testing-library/react';

test('Renders.', () => {
  const { getByText} = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const p = getByText("Heroku, JavaScript, React, Redux, Formik, Reactstrap.");
  const h5 = getByText("REGURU frontend");
  const h3 = getByText("To get started: create an account, log in, and enjoy!");
  // is the text displayed?
  expect(p).toBeInTheDocument();
  expect(h5).toBeInTheDocument();
  expect(h3).toBeInTheDocument();
});

