import React from 'react';
import { Col, Row, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import Logo from "./../../assets/img/logoGladmain.PNG";
import "./LoginForm.scss";

export default function LoginForm() {
    return(
        <div className="my-5 p-5 mx-5 bg-white">
            <Row>
                <Col md={6} className="text-center">
                <h1 className="mb-5 mt-5">Iniciar sesión</h1>

                <Formik
                initialValues={{ email: "" }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                    errors.email = 'Required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
<Form>
  <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
    <Form.Label column sm="4">Usuario</Form.Label>
    <Col sm="8">
        <Form.Control size="lg" type="email" placeholder="Enter email" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="4">
      Password
    </Form.Label>
    <Col sm="8">
      <Form.Control size="lg" type="password" placeholder="Password" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
  <Form.Label column sm="4">
      Rol
    </Form.Label>
    <Col sm="8">
    <Form.Select size="lg" aria-label="Default select example">
    <option>Selecciona tu rol</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    </Form.Select>
    </Col>
  </Form.Group>  
  <div className="d-grid gap-2">
  <Button variant="primary" type="submit" size="lg">
    Iniciar Sesión 
  </Button>
  </div>
</Form>
        );
      }}
    </Formik>                

                </Col>
                <Col md={6}>
                    <img src={Logo} alt="img-logo" />
                </Col>
            </Row>
        </div>
    )
}