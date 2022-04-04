import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LikedPropertyList from '../propertyLists/LikedPropertyList';
import UserContext from "../UserContext";

function handlePropertySearch(){
  console.log('test function')
}
test('Renders.', () => {
  const { getByText} = render(
    <BrowserRouter>
      <LikedPropertyList handlePropertySearch={handlePropertySearch}/>
    </BrowserRouter>
  );

const label1 = getByText("Add some properties...");
expect(label1).toBeInTheDocument();
});