import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


function PropertyData({propertyData, metrics}){
  const costs = +propertyData.taxes + +propertyData.owed + +propertyData.expenses
  const profit = propertyData.price - costs

  let number = numberWithCommas(profit)
  let lowE = propertyData.price * .16
  let highE = propertyData.price * .216
  let lowEquity = numberWithCommas(lowE)
  let highEquity = numberWithCommas(highE)

  //regex to convert to user facing numbers. 
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
  }, [propertyData])

  ChartJS.register(ArcElement, Tooltip, Legend);

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

  return (
    <Container>
      {data ?    
        <Pie
          data={data}
        />
      : <h5>No data to display.</h5>
      }
      { metrics ?
      <Row>
        <Col className="bg-black border border-white mt-2 p-2">
          <h5>Earning summary</h5>
          <p>You have made {number} from the purchase price.</p>
          <p>2022 housing prices are estimated to increase your equity by 16 - 21.6%: <br/>
             {lowEquity} - {highEquity}!</p>
        </Col>
      </Row>
      :<></>
      }
      
    </Container>
  )


}

export default PropertyData;

