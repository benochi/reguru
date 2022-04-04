import { render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavRoutes from '../nav/NavRoutes';
import UserContext from "../UserContext";


const render = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: "bob1", setCurrentUser: "bob1",
    }}>
    {component}
  </UserContext.Provider>
)

test('renders', () => {
  render(
    <BrowserRouter>
      <NavRoutes />
    </BrowserRouter>
  );
});