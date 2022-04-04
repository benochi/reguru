import { render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResultCardList from '../propertyLists/ResultCardList';
import UserContext from "../UserContext";

let properties = [1,2,3]
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
      <ResultCardList likedProperties={likedProperties} managedProperties={managedProperties} properties={properties} />
    </BrowserRouter>
  ); 
});