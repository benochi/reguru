import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../home/Home';
import UserContext from "../UserContext";
import Dashboard from './Dashboard';

const render = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: "bob1", setCurrentUser: "bob1",
    }}>
    {component}
  </UserContext.Provider>
)

/*const render2 = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: null, setCurrentUser: null,
    }}>
    {component}
  </UserContext.Provider>
) */
test('renders', () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  waitFor(screen.debug());
});

test('Redirect to home on not loggedin. ', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  screen.debug();
});

