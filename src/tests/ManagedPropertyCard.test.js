import { render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManagedPropertyCard from '../propertyLists/ManagedPropertyCard';
import UserContext from "../UserContext";

let price = 1000;
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
      <ManagedPropertyCard price={price}/>
    </BrowserRouter>
  );
});

test('Component shows propery elements', () => {
  render(
    <BrowserRouter>
      <ManagedPropertyCard price={price}/>
    </BrowserRouter>
  );
  let type = screen.getByText('Type:')
  let deleteBtn = screen.getByText('Delete')
  expect(type).toBeInTheDocument();
  expect(deleteBtn).toBeInTheDocument();
});

