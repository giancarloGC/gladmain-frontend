import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";


export default function DetailsCommit(props){
  const { segControl, control } = props;
  console.log(segControl);
  console.log(control);

  const [ checkeds, setCheckeds ] = useState({ radio1: false, radio: false });
  console.log(checkeds);

  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');
    return dateFormated[0];
    }
  }

    return(
        <Container>
            <Row className='justify-content-center'>
              <Col sm={10} className="mt-2 mb-4"> 
              
                <Formik
                initialValues={{ 
                  id: '',
                  idSeguimientoSalud: '',
                  fechaCompromiso: '',
                  nombre: '',
                  nuevoCompromiso: '',
                  fechaCumplimiento: null,
                  nombreAuxiliarEnfermeria: '',
                  tipo: null
                }}
                
                validate={(valores) => {
                  let errores = {};
                  const dateCurrently2 = new Date();
                  if(!valores.fechaCumplimiento){
                    errores.fechaCumplimiento = 'Asegurese de selecionar una fecha';
                  }else if(dateCurrently2 <= valores.fechaCumplimiento){
                    errores.fechaCumplimiento = 'Seleccione una fecha valida';
                  }
                  return errores;
                }}
                >

                {props => {
                    const { values, touched, errors, dirty, isSubmitting,
                            handleChange, handleBlur, handleSubmit, handleReset
                    } = props;
                    return (   
                    <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-1 mt-3">
                        <Form.Label column sm="3"><h1 style={{fontSize: "20px", color:"#0084d2" }}> No. Seguimiento </h1></Form.Label>
                        <Col sm="2">
                            <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="01" size="xs" id="idSeguimientoSalud" name="idSeguimientoSalud" 
                               value={segControl.id} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                        <Col sm=""> </Col>
                        <Form.Label column sm="3"><h1 style={{fontSize: "20px", color:"#0084d2" }}> Fecha Compromiso </h1></Form.Label>
                        <Col>
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="lg" id="fechaCompromiso" name="fechaCompromiso" 
                                 value={dateFormat(control.fechaCompromiso)} onChange={handleChange} onBlur={handleBlur} disabled
                              />
                          </InputGroup>
                        </Col>
                    </Form.Group>

                    <Container style={{border:'2px solid #eee', borderRadius:'5px'}}><br/>     

                    {control.tipo !== null && (
                      <Form.Group as={Row} className="mb-1 ">
                      <div class="middle">
                      {control.tipo === "Compromiso cumplido que no se mantuvo" ? 
                        <label >
                        <input type="radio" name="radio1"  checked={true}/>
                        <div class="box">
                          <span>Compromiso cumplido que no se mantuvo</span>
                        </div>
                        </label>
                        :
                        <label>
                        <input type="radio" name="radio" checked={true} />
                        <div class="box">
                          <span>Compromiso por nuevo factor de riesgo</span>
                        </div>
                        </label>
                        }
                      </div>
                    </Form.Group>
                    )}

                    <Form.Group as={Row} className="mt-2">
                    <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Nombre Compromiso</b></Form.Label>
                    </center>
                    <Col sm={12}>
                        <InputGroup hasValidation>
                               <Form.Control type="text" placeholder="Nombre Compromiso" size="xs" id="nombre" name="nombre" 
                               value={control.nombre} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                     </Col>
                     </Form.Group>

                     <Form.Group as={Row} className="mt-1">
                     <center>
                    <Form.Label column sm="3"><b style={{fontSize: "16px"}}>Compromiso</b></Form.Label>
                    </center>
                    <Col sm={12}>
                        <InputGroup hasValidation>
                            <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Descripción Compromiso" size="xs" id="nuevoCompromiso" name="nuevoCompromiso" 
                               value={control.nuevoCompromiso} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                     </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-4">
                    <Form.Label column sm="3"><h5 style={{fontSize: "16px"}}>Fecha Cumplimiento </h5></Form.Label>
                         <Col>
                          <InputGroup hasValidation>
                              <Form.Control type="date" size="xs" id="fechaCumplimiento" name="fechaCumplimiento" 
                                 value={dateFormat(control.fechaCumplimiento)} onChange={handleChange} onBlur={handleBlur} disabled
                              /> </InputGroup>
                        </Col>
                        <Form.Label column sm="3"><h5 style={{fontSize: "16px"}}>Profesional encargado</h5></Form.Label>
                        <Col>
                        <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Nombre profesional" size="xs" id="nombreAuxiliarEnfermeria" name="nombreAuxiliarEnfermeria" 
                               value={control.nombreAuxiliarEnfermeria} onChange={handleChange} onBlur={handleBlur} disabled
                            />
                        </InputGroup>
                        </Col>
                    </Form.Group><br/>
                    </Container>
                    </Form>
                            );
                        }}
                      </Formik> 
                </Col>
            </Row>
        </Container>
    )

}