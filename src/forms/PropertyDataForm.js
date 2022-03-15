import React, { useState } from "react";
import { Container, Form, Label, Row, FormGroup, Col, Input, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup"; 


function PropertyDataForm({setPropertyData, value, setMetrics}){
  const [formErrors, setFormErrors] = useState([]);
  
  const formik = useFormik({
    initialValues: {
      taxes: "",
      owed: "",
      expenses: ""
    },
    validationSchema: Yup.object({
      taxes: Yup.number().max(1000000, "Hello, Nicholas Cage."),
      owed: Yup.number().max(100000000, "Number is too long"),
      expenses: Yup.number().max(1000000, "Number is too long")
    }),
    //Note - "value" comes from dashboard, "values" is from form input. 
    onSubmit: async (values) => {
      if(values){
      setPropertyData({
        price: value.price,
        taxes: values.taxes,
        owed: values.owed,
        expenses: values.expenses
      })
      setMetrics(true)
      } else {
        let errors = []
        errors.push(formik.errors)
        setFormErrors(errors);
      }}
    })

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <FormGroup row className="mx-auto col-lg-4">
            <Label for="taxes" className="">
              Taxes:
            </Label>
            <Col sm={12}>
              <Input
                name="taxes"
                pattern="[0-9]*"
                className="form-control"
                value={formik.values.taxes}
                onChange={formik.handleChange}
                required
              />
              {formik.errors.taxes ? <p className="text-danger"><small>{formik.errors.taxes}</small></p> : null}
            </Col>
          </FormGroup>
          <FormGroup row className="mx-auto col-lg-4">
            <Label for="expenses" className="">
              Expenses:
            </Label>
            <Col sm={12}>
              <Input
                name="expenses"
                className="form-control"
                pattern="[0-9]*"
                value={formik.values.expenses}
                onChange={formik.handleChange}
                required
              />
              {formik.errors.expenses ? <p className="text-danger"><small>{formik.errors.expenses}</small></p> : null}
            </Col>
          </FormGroup>
          <FormGroup row className="mx-auto col-lg-4">
            <Label for="owed" className="">
              Owed:
            </Label>
            <Col sm={12}>
              <Input
                name="owed"
                pattern="[0-9]*"
                className="form-control"
                value={formik.values.owed}
                onChange={formik.handleChange}
                required
              />
              {formik.errors.owed ? <p className="text-danger"><small>{formik.errors.owed}</small></p> : null}
            </Col>
          </FormGroup>
          <Button 
            type="submit"
            style={{backgroundColor:"#00ff7f", color:"black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
            className="mx-auto col-sm-12"
            onClick={formik.onClick}
          >
            Calculate data
          </Button>  
        </Row>
      </Form>
    </Container>
  )
}

export default PropertyDataForm;