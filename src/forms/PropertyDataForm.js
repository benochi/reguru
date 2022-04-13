import React from "react";
import { Container, Form, Label, Row, FormGroup, Col, Input, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup"; 


function PropertyDataForm({setPropertyData, value, setMetrics}){
  
  let price = value.price;
  const formik = useFormik({
    initialValues: {
      taxes: "",
      owed: "",
      expenses: ""
    },
    validationSchema: Yup.object({
      taxes: Yup.number().max(10000000, "Number is too long").test(
        'are expenses less than price',
        'Taxes cannot be higher than price',
        function(value){ 
          return value === undefined || value <= price }).positive(),
      owed: Yup.number().max(100000000, "Number is too long").positive(),
      expenses: Yup.number().max(10000000, "Number is too long").test(
        'are expenses less than price',
        'Expenses cannot be higher than price',
        function(value){ 
          return value === undefined || value <= price }).positive()
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
      }}
    })

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <FormGroup row className="mx-auto col-lg-10">
            <Label for="taxes" className="">
              Enter Taxes in dollars:
            </Label>
            <Col sm={12}>
              <Input
                name="taxes"
                pattern="[0-9]*"
                className="form-control"
                value={formik.values.taxes}
                onChange={formik.handleChange}
                placeholder="$"
                required
              />
              {formik.errors.taxes ? <p className="text-danger"><small>{formik.errors.taxes}</small></p> : null}
            </Col>
          </FormGroup>  
        </Row>
        <Row>
          <FormGroup row className="mx-auto col-lg-10">
            <Label for="expenses" className="">
            Enter Expenses in dollars:
            </Label>
            <Col sm={12}>
              <Input
                name="expenses"
                className="form-control"
                pattern="[0-9]*"
                value={formik.values.expenses}
                onChange={formik.handleChange}
                placeholder="$"
                required
              />
              {formik.errors.expenses ? <p className="text-danger"><small>{formik.errors.expenses}</small></p> : null}
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <FormGroup row className="mx-auto col-lg-10">
            <Label for="owed" className="">
              Enter amount owed on properties in dollars:
            </Label>
            <Col sm={12}>
              <Input
                name="owed"
                pattern="[0-9]*"
                className="form-control"
                value={formik.values.owed}
                onChange={formik.handleChange}
                placeholder="$"
                required
              />
              {formik.errors.owed ? <p className="text-danger"><small>{formik.errors.owed}</small></p> : null}
            </Col>
          </FormGroup>
          </Row>
          <Button 
            type="submit"
            style={{backgroundColor:"#00ff7f", color:"black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
            className="mx-auto col-sm-12 m-1"
            onClick={formik.onClick}
          >
            Calculate data
          </Button>  
      </Form>
    </Container>
  )
}

export default PropertyDataForm;