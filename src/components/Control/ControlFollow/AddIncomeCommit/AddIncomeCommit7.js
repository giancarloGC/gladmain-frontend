import React, { useState, useEffect } from 'react';
import { Col, Row, Image, Form, Button, Modal, Container, InputGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import moment from 'moment';
import swal from 'sweetalert';

import { TOKEN } from "../../../../utils/constans";
import { insertCompApi } from "../../../../api/commitment";

export default function AddIncomeCommit(props) {
  const { edit, setShowPatologia, showCommit7, setShowCommit7, setDataCommit7, dataCommit7, setSaveData7} = props;
  const token = localStorage.getItem(TOKEN);

  const closemodal = () => {
    setShowCommit7(false);
    setShowPatologia(true);
  }
    return(
      <Modal show={showCommit7 ? true : false} size="xs"  onHide={() => closemodal()}  centered aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" style={{fontSize: "14px"}}> Agregar Compromiso </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">

        <Container >
            <Row>
                <Col sm={3} md={12} className="text-center">
                <h1 className="mb-3" style={{"fontSize": "25px"}}>Nuevo Compromiso</h1>

                <Formik
                initialValues={{ 
                  dateCommit:  moment().format("YYYY-MM-DD"),  
                  name: "Presenta una patología asociada identificada por el SGSSS", 
                  description: "",  
                  dateEnd: ""
                }}
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
                  const formData={
                    id: 1,
                    idSeguimientoSalud: parseInt(dataCommit7.idSeg),
                    fechaCompromiso: moment().format("YYYY-MM-DD"),
                    nombre: valores.name,
                    nuevoCompromiso: valores.description,
                    fechaCumplimiento: edit ? valores.dateEnd : null,
                    nombreAuxiliarEnfermeria: null,
                    tipo: null
                  };

                  insertCompApi(formData, token).then(response => {
                    if(response === true){
                      setDataCommit7({name: "titulooo", description: "ejemplo description"});
                      setSaveData7(false); //PASARLO A FALSE
                      swal({
                        title: `¡El compromiso fue almacenado correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        setShowCommit7(false);
                      });
                    }else if(response.status === 403){
                      swal("¡No tienes autorización para realizar esta acción, comunícate con el Admin!", {
                        icon: "warning",
                      }).then((value) => {
                        localStorage.removeItem(TOKEN);
                        window.location.replace("/");
                      });
                    }else{
                      swal("Opss! Ocurrió un error!", {
                        icon: "error",
                      });
                    }
                  })
                }}
    
                >
      {props => {
        const { values, touched, errors, dirty, isSubmitting,
                handleChange, handleBlur, handleSubmit, handleReset
        } = props;
        return (
<Form onSubmit={handleSubmit}>

    <Form.Group as={Row} className="mb-1">
    <Form.Label column sm="5"><h1 style={{"fontSize": "18px", "color":"#0084d2" }}>Fecha Compromiso </h1></Form.Label>
        <Col sm="2"> </Col>
        <Col sm="5">
        <InputGroup hasValidation>
        <Form.Control type="date" size="xs" id="dateCommit" name="dateCommit" 
            value={values.dateCommit} onChange={handleChange} onBlur={handleBlur} disabled
            />
        </InputGroup>
        </Col>
    </Form.Group>


    <Form.Group as={Row} className="mb-2">
    <Form.Label column sm="12"><span style={{fontSize: "16px"}}>Nombre Compromiso</span></Form.Label>
        <Col md={12}>
        <InputGroup hasValidation>
                    <Form.Control  type="text"  size="xs" id="name" name="name" 
                    value={values.name} onChange={handleChange} onBlur={handleBlur} style={{"fontWeight": "bold"}} disabled
                />
        </InputGroup>
            </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="12"> <span style={{fontSize: "16px"}}>Descripción </span></Form.Label>
        <Col md={12}>
        <InputGroup hasValidation>
                    <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Descripción del Compromiso" size="xs" id="description" name="description" 
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

    <Form.Group as={Row} className="mb-1">
    <Form.Label column sm="5"><h1 style={{"fontSize": "18px", "color":"#0084d2" }}>Fecha Cumplimiento</h1></Form.Label>
        <Col sm="2"> </Col>
        <Col sm="5">
        <InputGroup hasValidation>
        <Form.Control type="date" size="xs" id="dateEnd" name="dateEnd" 
            value={values.dateEnd} onChange={handleChange} onBlur={handleBlur} disabled={edit ? false : true} />
        </InputGroup>
        </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-1">
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