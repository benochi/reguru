import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';
import UserContext from "../UserContext";


const render = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: "bob1", setCurrentUser: "bob1",
    }}>
    {component}
  </UserContext.Provider>
)

const render2 = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: null, setCurrentUser: null,
    }}>
    {component}
  </UserContext.Provider>
)

test('renders', () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
  screen.debug();
});

test('Logged-in Navbar displays proper links', () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText('Real Estate GURU'))
  fireEvent.click(screen.getByText('Log out'))
  fireEvent.click(screen.getByText('Dashboard'))
});

test('Logged-out Navbar displays proper links', () => {
  render2(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText('Real Estate GURU'))
  fireEvent.click(screen.getByText('Home'))
  fireEvent.click(screen.getByText('Login'))
  fireEvent.click(screen.getByText('Register'))
});