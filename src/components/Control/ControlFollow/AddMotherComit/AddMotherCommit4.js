import React, { useState, useEffect } from 'react';
import { Col, Row, Image, Form, Button, Modal, Container, InputGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import moment from 'moment';
import swal from 'sweetalert';

import { TOKEN } from "../../../../utils/constans";
import { insertCompApi } from "../../../../api/commitment";

export default function AddMotherCommit4(props) {
  const { edit, showCommit4, setShowCommit4, setDataCommit4, dataCommit4, setSaveData4} = props;
  const token = localStorage.getItem(TOKEN);

    return(
      <Modal show={showCommit4 ? true : false} size="xs"  onHide={() => setShowCommit4(false)}  centered aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"  style={{fontSize: "14px"}}> Agregar Compromiso </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">

        <Container >
            <Row>
                <Col sm={3} md={12} className="text-center">
                <h1 className="mb-3" style={{"fontSize": "25px"}}>Nuevo Compromiso</h1>

                <Formik
                initialValues={{ 
                  dateCommit: moment().format("YYYY-MM-DD"), 
                  name: "Asiste a controles prenatales", 
                  description: "",  
                  dateEnd: "",
                  fechaTentativaCumplimiento: ''
                }}
                validate={(valores) => {
                  let errores = {};
                  if(!valores.description){
                    errores.description = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.description)){
                    errores.description = 'Nombre incorrecto, solo puedes escribir letras';
                  }
                  if(!valores.fechaTentativaCumplimiento){
                    errores.fechaTentativaCumplimiento = 'No se permiten campos vacíos'
                  }
                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                  const formData={
                    id: 1,
                    idSeguimientoSalud: parseInt(dataCommit4.idSeg),
                    fechaCompromiso: moment().format("YYYY-MM-DD"),
                    nombre: valores.name,
                    nuevoCompromiso: valores.description,
                    fechaCumplimiento: edit ? valores.dateEnd : null,
                    nombreAuxiliarEnfermeria: null,
                    tipo: null,
                    fechaTentativaCump: valores.fechaTentativaCumplimiento
                  };
                  console.log(formData);
                  insertCompApi(formData, token).then(response => {
                    console.log(response);
                    if(response === true){
                      setDataCommit4({name: "titulooo", description: "ejemplo description"});
                      setSaveData4(false); //PASARLO A FALSE
                      swal({
                        title: `¡El compromiso fue almacenado correctamente!`,
                        icon: 'success'
                      }).then((value) => {
                        setShowCommit4(false);
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
                    <Form.Control as="textarea" aria-label="With textarea" type="text"  size="xs" id="name" name="name" 
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

    <Form.Group as={Row} className="mt-1">
                    <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Fecha tentativa cumplimiento</b></Form.Label>
                    </center>
                    <Col sm={12}>
                        <InputGroup hasValidation>
                        <Form.Control type="date" size="xs" id="fechaTentativaCumplimiento" name="fechaTentativaCumplimiento" 
                                 value={values.fechaTentativaCumplimiento} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.fechaTentativaCumplimiento && touched.fechaTentativaCumplimiento}
                                 isValid={!errors.fechaTentativaCumplimiento && touched.fechaTentativaCumplimiento}
                              />
                            <Form.Control.Feedback type="invalid">
                                {errors.fechaTentativaCumplimiento}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
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