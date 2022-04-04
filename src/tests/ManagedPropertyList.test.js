import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManagedPropertyList from '../propertyLists/ManagedPropertyList';
import UserContext from "../UserContext";

let price = 1000;
function handleManagedPropertySearch(){
  console.log('Test function');
}
const render = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: "bob1", setCurrentUser: "bob1",
    }}>
    {component}
  </UserContext.Provider>
)

test('Renders proper elements', () => {
  render(
    <BrowserRouter>
      <ManagedPropertyList handleManagedPropertySearch={handleManagedPropertySearch} price={price}/>
    </BrowserRouter>
  );
  let h2 = screen.getByText('Add some properties...')
  expect(h2).toBeInTheDocument();  
});
