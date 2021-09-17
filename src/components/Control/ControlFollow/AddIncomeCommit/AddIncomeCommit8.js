import React, { useState, useEffect } from 'react';
import { Col, Row, Image, Form, Button, Modal, Container, InputGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import moment from 'moment';

export default function AddIncomeCommit(props) {
  const { showCommit8, setShowCommit8, setDataCommit8, dataCommit8, setSaveData8} = props;

          //showCommit2 ? true : false} size="lg"  onHide={() => setShowCommit2(false)
    return(
      <Modal show={showCommit8 ? true : false} size="lg"  onHide={() => setShowCommit8(false)}  centered aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"> Agregar Compromiso </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">

        <Container >
            <Row>
                <Col sm={3} md={12} className="text-center">
                <h1 className="mb-3">Nuevo Compromiso</h1>

                <Formik
                initialValues={{ 
                  dateCommit: moment().format("YYYY-MM-DD"),  
                  name: "Recibe medicamentos formulados por el SGSSS para alguna patología", 
                  description: "",  
                  dateEnd: ""}}
                validate={(valores) => {
                  let errores = {};
                  if(!valores.description){
                    errores.description = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.description)){
                    errores.description = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                    setDataCommit8({title: "data"});
                    setSaveData8(true);
                }}
    
                >
      {props => {
        const { values, touched, errors, dirty, isSubmitting,
                handleChange, handleBlur, handleSubmit, handleReset
        } = props;
        return (
<Form onSubmit={handleSubmit}>

    <Form.Group as={Row} className="mb-1">
        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Fecha Compromiso </Form.Label>
        <Col sm="4"> </Col>
        <Col sm="4">
        <InputGroup hasValidation>
        <Form.Control type="date" size="lg" id="dateCommit" name="dateCommit" 
            value={values.dateCommit} onChange={handleChange} onBlur={handleBlur} disabled
            />
        </InputGroup>
        </Col>
    </Form.Group>


    <Form.Group as={Row} className="mb-2">
        <Form.Label column sm="12" style={{"fontSize": "12px !important"}}>Nombre Compromiso</Form.Label>
        <Col md={12}>
        <InputGroup hasValidation>
                    <Form.Control  type="text"  size="lg" id="name" name="name" 
                    value={values.name} onChange={handleChange} onBlur={handleBlur} style={{"fontWeight": "bold"}} disabled
                />
        </InputGroup>
            </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="12" style={{"fontSize": "12px !important"}}>Descripción</Form.Label>
        <Col md={12}>
        <InputGroup hasValidation>
                    <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Descripción del Compromiso" size="lg" id="description" name="description" 
                    value={values.description} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.description && touched.description}
                    isValid={!errors.description && touched.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
            </InputGroup>
            </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4" style={{"fontSize": "12px !important"}}>Fecha Cumplimiento</Form.Label>
        <Col sm="4"> </Col>
        <Col sm="4">
        <InputGroup hasValidation>
        <Form.Control type="date" size="lg" id="dateEnd" name="dateEnd" 
            value={values.dateEnd} onChange={handleChange} onBlur={handleBlur} disabled />
        </InputGroup>
        </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
    <Col sm="3"></Col>
        <Col sm="6">
        <div  as={Row} className="d-grid gap-2">
        <Button variant="primary" type="submit" size="lg" >
            Registrar
        </Button>
        </div>
        </Col>
    <Col sm="3"></Col>
    </Form.Group>
</Form>
        );
      }}
    </Formik>  
    </Col>
    </Row>
        </Container>
        </Modal.Body>
        </Modal>
    )
}