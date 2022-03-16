import React from "react"
import "./Home.css";
import { Container, Col, Row } from "reactstrap";

function Home(){
  return (
    <div className="Home p-5">
      <Container className="mx-auto col-lg-12 bg-black m-5 border border-white">
        <h1 className="p-3">
          Welcome to REGURU!
        </h1>
        <Row>
          <Col className="mb-3 col-md-12 d-flex ml-auto ">
            <p>
              REGURU, or Real Estate Guru, is an app to help investors find houses, manage their properties, and calculate return on investment.
              REGURU-API uses a database filled with real data from the United States.  This is a test API and is not maintained regularly. 
              All of the data in the API was collected and processed using custom python apps for the API. 
            </p>
          </Col>
        </Row>
        <h2>Stacks used:</h2>
        <Row>
          <Col className="col-md-4">
            <h5>REGURU-API</h5>
            <p>Heroku, MongoDB, MongoDB Atlas, Mongoose, NodeJS, Express, Python(data).</p>
          </Col>
          <Col className="col-md-4">
            <h5>REGURU backend</h5>
            <p>Heroku, MongoDB, MongoDB Atlas, Mongoose, NodeJS, Express.</p>
          </Col>
          <Col className="col-md-4">
            <h5>REGURU frontend</h5>
            <p>Heroku, JavaScript, React, Formik, Reactstrap.</p>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3 col-md-12">
            <h3 className="p-3">To get started: create an account, log in, and enjoy!</h3>
            <p>Or, if you want immediate access you can use the test account.</p>
          </Col>
          </Row>
          <Row>
          <Col className="mb-3 col-md-12">
            <p>Test user: testuser </p>
            <p>Password: test1234 </p>
          </Col>
        </Row>        
      </Container>
    </div>
  )
}

export default Home; 
