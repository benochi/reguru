import { fireEvent, render as rtlRender, screen,} from '@testing-library/react';
import UserContext from "../UserContext";
import { BrowserRouter } from 'react-router-dom';
import PropertyData from './PropertyData';

const render = component => rtlRender(
  <UserContext.Provider
    value={{
      currentUser: "testuser"
    }}>
    {component}
  </UserContext.Provider>
)

let propertyData = {
  price: 100000,
  taxes: 1000,
  owed: 2000,
  expenses: 3000
}
const costs = +propertyData.taxes + +propertyData.owed + +propertyData.expenses
const profit = propertyData.price - costs

let metrics = {
  price: 100000,
  taxes: 1000,
  owed: 2000,
  expenses: 3000
}

const data ={
  labels: [
    'Profit',
    'Expenses',
    'Taxes',
    'Owed'
  ],
  datasets: [
    {
      label: 'Property Metrics',
      data: [profit, propertyData.expenses, propertyData.taxes, propertyData.owed],
      backgroundColor: [
        'rgba(0, 255, 127, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(0, 255, 127, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',            
      ],
      borderWidth: 1,
      hoverOffset: 4
    }
  ],
}

let number = 100
let lowE = 10
let highE = 20
let lowEquity = 30
let highEquity = 40

test('Renders.', () => {
  render(
    <BrowserRouter>
      <PropertyData propertyData={propertyData} />
    </BrowserRouter>
  );
  screen.debug();
});

it('Matches snapshot', function()  {
  const { asFragment } = render(
    <BrowserRouter>
      <PropertyData propertyData={propertyData} />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  screen.debug();
});

it("checks for Metrics", function() {
  const { getByText } = render(
    <BrowserRouter>
      <PropertyData propertyData={propertyData} metrics={metrics} data={data} />
    </BrowserRouter>
  );
  const h5 = getByText("Earning summary");
  
  // is the text displayed?
  expect(h5).toBeInTheDocument();
});

it("checks if data exists", function() {
  const { queryByText } = render(
    <BrowserRouter>
      <PropertyData propertyData={propertyData} data={data} />
    </BrowserRouter>
  );
  // 'No data to display' should not be found.
  const noData = queryByText('No data to display.')
  expect(noData).toBeNull()
});