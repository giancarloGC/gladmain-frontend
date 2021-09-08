import React, { useState, useEffect } from 'react';
import { Col, Row, Image, Form, Button, Modal, Container, InputGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import bcrypt from "bcryptjs";
import Logo from "./../../assets/img/logoGladmain.PNG";
import LayoutAdmin from "../../layouts/LayoutAdmin";

import { Route, Redirect } from "react-router-dom";
import Home from "../../pages/Home/Home";

import { getRolesApi } from "../../api/rol";
import { loginApi } from "../../api/login";
import { TOKEN } from "../../utils/constans";
import "./LoginForm.scss";

export default function LoginForm(props) {
  const { showLogin, setShowLogin } = props;
  const [ formSend, setFormSend ] = useState(false);
  const [ textFormSend, setTextFormSend ] = useState("");
  const [ rolesApi, setRolesApi ] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getRolesApi();
      setRolesApi(response);
    })();
  }, []);
    return(
      <Modal show={showLogin} size="xl"  onHide={() => setShowLogin(false)}  centered aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"> Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
        <Container className="p-5">
            <Row>
                <Col sm={2} md={6} className="text-center">
                <h1 className="mb-5">Iniciar sesión</h1>

                <Formik
                initialValues={{ document: '', password: "", role: "" }}
                validate={(valores) => {
                  let errores = {};
                  if(!valores.document){
                    errores.document = 'Por favor, ingresa números'
                  }else if(!/^([0-9])*$/.test(valores.document)){
                    errores.document = 'Documento incorrecto, solo puedes escribir números';
                  }

                  if (!valores.password){
                    errores.password = 'Por favor, ingresa una contraseña'
                  }else if(valores.password.length < 8){
                    errores.password = 'La contraseña debe tener un minimo de 8 caracteres'
                  }

                  if(!valores.role){
                    errores.role = 'Asegurese de selecionar un rol';
                  }
                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                  //resetForm(valores);
                  /*bcrypt.genSalt(10, function(err, salt) {
                      bcrypt.hash("12345678", salt, function(err, hash) {
                          valores.password = hash;
                      });
                  });*/
                  loginApi(valores).then(response => {
                    if(response.status === 500){
                      setTextFormSend("¡Usuario o clave incorrectos, intentelo nuevamente!");
                    }else{
                      setTextFormSend("¡Inicio de sesión exitoso!");
                      localStorage.setItem(TOKEN, response.tokenJWT);
                      window.location.replace("/admin");
                    }
                  });
                  setFormSend(true);
                  setTimeout(() => {
                      setFormSend(false);
                  }, 3000);
                }}
                >
      {props => {
        const { values, touched, errors, dirty, isSubmitting,
                handleChange, handleBlur, handleSubmit, handleReset
        } = props;
        return (
<Form onSubmit={handleSubmit}>
  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="4">Usuario</Form.Label>
    <Col sm="8">              
    <InputGroup hasValidation>

        <Form.Control size="lg" type="number" name="document" id="document" placeholder="Ej: 1090111999"
            value={values.document} onChange={handleChange} onBlur={handleBlur}
            isInvalid={!!errors.document && touched.document} isValid={!errors.document && touched.document}
        />
            <Form.Control.Feedback type="invalid">
              {errors.document}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
    </InputGroup>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="4">
      Password
    </Form.Label>
    <Col sm="8">
    <InputGroup hasValidation>

      <Form.Control size="lg" type="password" placeholder="Password" id="password" name="password" 
        value={values.password} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && touched.password}
        isValid={!errors.password && touched.password}
      />
      <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
</InputGroup>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
  <Form.Label column sm="4">
      Rol
    </Form.Label>
    <Col sm="8">
    <InputGroup hasValidation>
      <Form.Select size="lg" name="role" onChange={handleChange} onBlur={handleBlur}
              isValid={!errors.role && touched.role} isInvalid={!!errors.role && touched.role}
      >
      <option disabled selected>Selecciona tu rol</option>
      {rolesApi.length > 0 && (
        rolesApi.map((data, index) => (
          <option key={index} value={data.idRol}>{data.nombre}</option>
        ))
      )}
    </Form.Select>
    <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
    <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
    </InputGroup>
    </Col>
  </Form.Group>  
  <div className="d-grid gap-2">
  <Button variant="primary" type="submit" size="lg">
    Iniciar Sesión 
  </Button>
  {formSend && <p className="text-success">{textFormSend}</p>}
  </div>
</Form>
        );
      }}
    </Formik>                

                </Col>
                <Col sm={2} md={6}>
                    <Image src={Logo} alt="img-logo" fluid />
                </Col>
            </Row>
        </Container>
        </Modal.Body>
        </Modal>
    )
}