import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow'
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../UserContext';
import Dashboard from '../pages/Dashboard';

const UserContextProvider = ({ children }) => (
  <UserContext.Provider value={{
    currentUser: "testuser"
  }}>{children}</UserContext.Provider>
);

const wrapper = ({ children }) => (
  <BrowserRouter>
    <UserContextProvider>
      {children}
    </UserContextProvider>
  </BrowserRouter>
);
let dashboard = wrapper(<Dashboard />)
let resultLikedProperties = [];

const mockSetLikedProperties = jest.fn().mockImplementation(property => {
  resultLikedProperties = [...property];
  return resultLikedProperties;
}); 

const mockUserContext = jest.fn().mockImplementation(() => ({
  currentUser: "testuser",
  setLikedProperties: mockSetLikedProperties,
  setManagedProperties: mockSetManagedProperties,
  setValue: mockSetValue,
  setMetrics: mockSetMetrics
}));

React.useContext = mockUserContext;

afterEach(cleanup)

test('Renders.', () => {
  wrapper(
    <Dashboard />
  );
  screen.debug();
});

it('renders correctly react-test-renderer', () => {
  const renderer = new ShallowRenderer();
  renderer.render(dashboard);
  const result = renderer.getRenderOutput();
  
  expect(result).toMatchSnapshot();
});




