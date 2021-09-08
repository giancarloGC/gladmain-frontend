import React, { useState, useEffect } from 'react';
import { Col, Row, Image, Form, Button, Modal, Container, InputGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";

//import { Route, Redirect } from "react-router-dom";

//import { TOKEN } from "../../utils/constans";

export default function AddIncomeCommit(props) {
  const { showCommit, setShowCommit, setDataCommit, dataCommit, setSaveData, 
          showCommit2, setShowCommit2, setDataCommit2, dataCommit2, setSaveData2, 
          showCommit3, setShowCommit3, setDataCommit3, dataCommit3, setSaveData3,
          showCommit4, setShowCommit4, setDataCommit4, dataCommit4, setSaveData4,
          showCommit5, setShowCommit5, setDataCommit5, dataCommit5, setSaveData5,
          showCommit6, setShowCommit6, setDataCommit6, dataCommit6, setSaveData6,
          showCommit7, setShowCommit7, setDataCommit7, dataCommit7, setSaveData7,
          showCommit8, setShowCommit8, setDataCommit8, dataCommit8, setSaveData8,
          showCommit9, setShowCommit9, setDataCommit9, dataCommit9, setSaveData9,} = props;

          //showCommit2 ? true : false} size="lg"  onHide={() => setShowCommit2(false)
    return(
      <Modal show={showCommit ? true : false} size="lg"  onHide={() => setShowCommit(false)}  centered aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"> Agregar Compromiso </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">

        <Container >
            <Row>
                <Col sm={3} md={12} className="text-center">
                <h1 className="mb-3">Nuevo Compromiso</h1>

                <Formik
                initialValues={{ dateCommit: '', name: "", description: "",  dateEnd: ""}}
                validate={(valores) => {
                  let errores = {};

                  const dateCurrently2 = new Date();
                  /*if(!valores.dateCommit){
                    errores.dateCommit = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.dateCommit){
                    errores.dateCommit = 'Seleccione una fecha valida';
                  }
                  if(!valores.name){
                    errores.name = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.name)){
                    errores.name = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.description){
                    errores.description = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.description)){
                    errores.description = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.dateEnd){
                    errores.dateEnd = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.dateEnd){
                    errores.dateEnd = 'Seleccione una fecha valida';
                  }*/
                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                    setDataCommit({title: "data"});
                    setSaveData(true);
                }}
    
                >
      {props => {
        const { values, touched, errors, dirty, isSubmitting,
                handleChange, handleBlur, handleSubmit, handleReset
        } = props;
        return (
<Form onSubmit={handleSubmit}>

    <Form.Group as={Row} className="mb-1">
        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha Compromiso </Form.Label>
        <Col sm="4"> </Col>
        <Col sm="4">
        <InputGroup hasValidation>
        <Form.Control type="date" size="lg" id="dateCommit" name="dateCommit" 
            value={values.dateCommit} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.dateCommit && touched.dateCommit}
            isValid={!errors.dateCommit && touched.dateCommit}
            />
            <Form.Control.Feedback type="invalid">
                {errors.dateCommit}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
        </InputGroup>
        </Col>
    </Form.Group>


    <Form.Group as={Row} className="mb-2">
        <Form.Label column sm="12" style={{"font-size": "12px !important"}}>Nombre Compromiso</Form.Label>
        <Col md={12}>
            <InputGroup hasValidation>
                    <Form.Control type="text" placeholder="Nombre Item de Ingreso que no cumple" size="lg" id="name" name="name" 
                    value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name && touched.name}
                    isValid={!errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
            </InputGroup>
            </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="12" style={{"font-size": "12px !important"}}>Descripción</Form.Label>
        <Col md={12}>
            <InputGroup hasValidation>
                    <Form.Control type="text" placeholder="Descripción del Compromiso" size="lg" id="description" name="description" 
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
        <Form.Label column sm="4" style={{"font-size": "12px !important"}}>Fecha Cumplimiento</Form.Label>
        <Col sm="4"> </Col>
        <Col sm="4">
        <InputGroup hasValidation>
        <Form.Control type="date" size="lg" id="dateEnd" name="dateEnd" 
            value={values.dateEnd} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.dateEnd && touched.dateEnd}
            isValid={!errors.dateEnd && touched.dateEnd}
            />
            <Form.Control.Feedback type="invalid">
                {errors.dateEnd}
            </Form.Control.Feedback>
            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
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