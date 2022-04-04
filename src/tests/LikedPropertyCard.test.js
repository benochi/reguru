import { render as rtlRender, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LikedPropertyCard from '../propertyLists/LikedPropertyCard';
import UserContext from "../UserContext";

let price = 1000;
const render = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: "testuser", setCurrentUser: "testuser",
    }}>
    {component}
  </UserContext.Provider>
)

test('renders', () => {
  render(
    <BrowserRouter>
      <LikedPropertyCard price={price}/>
    </BrowserRouter>
  );
});