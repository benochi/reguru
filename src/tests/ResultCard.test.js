import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResultCard from '../propertyLists/ResultCard';
import UserContext from "../UserContext";

let managedProperties = ['1']
let likedProperties = ['2']
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
      <ResultCard likedProperties={likedProperties} managedProperties={managedProperties} />
    </BrowserRouter>
  ); 
});