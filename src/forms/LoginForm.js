import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, FormGroup, Form, Label, Input, Col, Row, Button } from "reactstrap"
import { useFormik } from "formik";
import * as Yup from "yup"; 
import "./LoginForm.css"

function LoginForm({ login }){
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must be 20 characters or less.")
        .required("Required"),
      password: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values) => {
      let result = await login(values);
      if (result.success) {
        navigate('../dashboard')
      } else {
        let errors = []
        errors.push(result.errors)
        setFormErrors(errors);
      }
    }
  })
 
  return (
    <Container className="bg-black text-white container col-lg-12 mt-5 mb-3 border border-white">
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <FormGroup row className="mx-auto mt-3 mb-2 mr-sm-2 mb-sm-0 col-lg-8">
            <Label for="username" className="mr-sm-2 mt-2">
              Username
            </Label>
            <Col sm={12}>
              <Input
                name="username"
                className="form-control"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="username"
                required
              />
              {formik.touched.username && formik.errors.username ? <p className="text-danger"><small>{formik.errors.username}</small></p> : null}
              </Col>
          </FormGroup>
          <FormGroup row className="mx-auto mb-2 mr-sm-2 mt-2 mb-sm-0 col-lg-8">
            <Label>
              Password
            </Label>
            <Col sm={12}>
              <Input
                type="password"
                name="password"
                className="form-control"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                required
              />
              {formik.touched.password && formik.errors.password ? <p className="text-danger"><small>{formik.errors.password}</small></p> : null}
              </Col>
          </FormGroup>
                { formErrors.length
                  ? <p className="text-danger"><small>Invalid username/password</small></p>
                  : null}
                <Button type="submit" className="bg-primary mx-auto col-lg-6 mt-5 mb-5" onSubmit={formik.onSubmit}>
                  Login!
                </Button>
        </Row>
      </Form>
    </Container>
  )
}

export default LoginForm;