import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner, Table, Modal} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { TOKEN } from "../../../utils/constans";
import  AuthContext  from "../../../hooks/useAuth";
import moment from 'moment';
import swal from 'sweetalert';
import "./AddControlV.scss";
import { insertContVaccApi } from "../../../api/vaccination";

export default function AddControlV(props){
  const { userControl, listVac, listControls } = props;
  const { user } = AuthContext();
  const token = localStorage.getItem(TOKEN);
  const [ userApi, setUserByIdApi ] = useState({});
  const [show, setShow] = useState(false);
  const [ vaccinesSelected, setVaccinesSelected ] = useState([]);
  const [ goRedirect, setGoRedirect ] = useState(false);
  const [ showSpinner, setShowSpinner ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ newInfoVac, setNewInfoVac ] = useState({ lote: '', institucion: '', profesional: ''});

  const [ infoGeneral, setInfoGeneral] = useState({
      Tuberculosis_0: { fecha: null, idVac: 1, nombreVac: "Tuberculosis B.C.G", dosis: 1 }, 
      Hepatitis_0: { fecha: null, idVac: 2, nombreVac: "Hepatitis B", dosis: 1 },
      Polio_2: { fecha: null, idVac: 3, nombreVac: "Polio (Oral – IM)", dosis: 1 },
      PENTAVALENTE_2: { fecha: null, idVac: 4, nombreVac: "PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)", dosis: 1 },
      Rotavirus_2: { fecha: null, idVac: 5, nombreVac: "Rotavirus", dosis: 1 },
      Neumococo_2: { fecha: null, idVac: 6, nombreVac: "Neumococo", dosis: 1 },
      Polio_4: { fecha: null, idVac: 7, nombreVac: "Polio (Oral – IM)", dosis: 2 },
      PENTAVALENTE_4: { fecha: null, idVac: 8, nombreVac: "PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)", dosis: 2 },
      Rotavirus_4: { fecha: null, idVac: 9, nombreVac: "Rotavirus", dosis: 2 },
      Neumococo_4: { fecha: null, idVac: 10, nombreVac: "Neumococo", dosis: 2 },
      Polio_6: { fecha: null, idVac: 11, nombreVac: "Polio (Oral – IM)", dosis: 3 },
      PENTAVALENTE_6: { fecha: null, idVac: 12, nombreVac: "PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)", dosis: 3 },
      Influenza_6: { fecha: null, idVac: 13, nombreVac: "Influenza", dosis: 1 },
      Influenza_7: { fecha: null, idVac: 14, nombreVac: "Influenza", dosis: 2 },
      Sarampion_12: { fecha: null, idVac: 15, nombreVac: "Sarampión Rubéola Paperas (SRP)", dosis: 1 },
      Fiebre_12: { fecha: null, idVac: 16, nombreVac: "Fiebre Amarilla", dosis: 1 },
      Neumococo_12: { fecha: null, idVac: 17, nombreVac: "Neumococo", dosis: 3 },
      Influenza_12: { fecha: null, idVac: 18, nombreVac: "Influenza", dosis: 3 },
      Hepatitis_12: { fecha: null, idVac: 19, nombreVac: "Hepatitis A", dosis: 1 },
      Difteria_18: { fecha: null, idVac: 20, nombreVac: "Difteria – Tosferina – Tétano (DPT)", dosis: 1 },
      Polio_18: { fecha: null, idVac: 21, nombreVac: "Polio (Oral – IM)", dosis: 4 },
      Polio_60: { fecha: null, idVac: 22, nombreVac: "Polio (Oral – IM)", dosis: 5 },
      Difteria_60: { fecha: null, idVac: 23, nombreVac: "Difteria – Tosferina – Tétano (DPT)", dosis: 2 },
      Sarampion_60: { fecha: null, idVac: 24, nombreVac: "Sarampión Rubéola Paperas (SRP)", dosis: 2 }
  });

  const PintarCampo = (props) => {
    const { text, dosis, nameVac, sufijoVac} = props; 
    return (
      <>
        <td>{text}
        <div>
                <input type="checkbox" className="switch_1" checked={searchByDosis(dosis, nameVac) || infoGeneral[sufijoVac].fecha ? true : false}
                    onChange={e => onChangeControl(e, dosis, nameVac, sufijoVac)}
                />
            </div>
        </td>
        <td>
          {searchByDosis(dosis, nameVac) && (
            <InputGroup hasValidation>
                <Form.Control type="date" id="fechaAplicacion" name="fechaAplicacion" 
                    defaultValue={searchByDosis(dosis, nameVac)} disabled
                />
            </InputGroup>
          )}
          {infoGeneral[sufijoVac].fecha && (
            <InputGroup hasValidation>
              <Form.Control type="date" id={sufijoVac} name={sufijoVac} 
                  value={infoGeneral[sufijoVac].fecha} onChange={(e) => onChangeDate(e)} isInvalid={infoGeneral[sufijoVac].fecha ? false : true} isValid={infoGeneral[sufijoVac].fecha ? true : false}/>
              <Form.Control.Feedback type="invalid">
                  Fecha invalida!
              </Form.Control.Feedback>
              <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
          </InputGroup>
          )}
        </td>
      </>
    )
  }

  let dateFechaNaci = moment(userControl.fechaNacimiento);
  let dateCurrent = moment();
  userControl.edad = dateCurrent.diff(dateFechaNaci, 'months');


  const onChangeDate = (e) => {
      let vacuna = moment(e.target.value);
      if(vacuna.diff(dateCurrent, 'hours') > 0){
        setInfoGeneral({...infoGeneral, [e.target.name]: {...infoGeneral[e.target.name], fecha: null}});
      }else{
        setInfoGeneral({...infoGeneral, [e.target.name]: {...infoGeneral[e.target.name], fecha: e.target.value}});
        return true;
      }
  }


  const searchByDosis = (countDosis, nombreVac) => {
    let fechaAplicacion = null;
    let dosis = listControls.filter(control => control.dosis === countDosis);
    if(dosis.length > 0){
      dosis.map((control, index) => {
        if(control.vacunasRegistradas.length > 0){
          let listVac = control.vacunasRegistradas.filter(vac => vac.nombre === nombreVac);
          if(listVac.length > 0){
            fechaAplicacion = dateFormat(control.fechaAplicacion);
          }else{
          }
        }else{
        }
      })
    }else{

      //return false;
    }
    return fechaAplicacion;
  }

  const onChangeControl = async (e, dosis, nameVac, input) => {
    if(e.target.checked){
      //Buscar las vacunas por edad

      setInfoGeneral({...infoGeneral, [input]: {...infoGeneral[input], fecha: moment().format("YYYY-MM-DD"), dosis: dosis}});
    }else{
      if(!searchByDosis(dosis, nameVac)){
        setInfoGeneral({...infoGeneral, [input]: {...infoGeneral[input], fecha: null}});
      }else{
      }
    }
  }
  
  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');

    return dateFormated[0];
    }
  }
  
  const handleCheck = (e, item) => {
    let vaccines = {
        id: item.id,
        meses: item.meses,
        nombre: item.nombre,
    }
    if(e.target.checked){
      setVaccinesSelected([...vaccinesSelected, vaccines]);
    }else{
        const result = vaccinesSelected.filter((vacc) => {
            return vacc.id != item.id && vacc.meses != item.meses && vacc.nombre != item.nombre;
        });
        setVaccinesSelected(result);
    }
}

    const saveControlVac = async (e) => {
      e.preventDefault();
      setShowModal(true);
    }

    return(
        <Container>
      <Modal show={showModal ? true : false} size="xs"  onHide={() => setShowModal(false)}  centered aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" style={{fontSize: "20px"}}> Actualizar el control de vacunas </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">

        <Formik
                    initialValues={newInfoVac}
                    validate={(valores) => {
                    let errores = {};
                    if(!valores.lote){
                        errores.lote = 'No se permiten campos vacíos'
                    }
                    if(!valores.institucion){
                      errores.institucion = 'No se permiten campos vacíos'
                    }
                    if(!valores.profesional){
                      errores.profesional = 'No se permiten campos vacíos'
                    }
                    return errores;
                    }}
                    onSubmit={(valores, {resetForm}) => {
                      const arrayControl = Object.values(infoGeneral);
                      const filtroVac = arrayControl.filter(control => control.fecha !== null);
                      filtroVac.map((item, index) => {
                          const formData = {
                            idUsuario: userControl.documento,
                            fechaAplicacion: item.fecha,
                            dosis: item.dosis,
                            edadGestacional: null,
                            vigente: true,
                            lote: valores.lote,
                            institucion: valores.institucion,
                            profesionalSalud: valores.profesional,
                            vacunas: [
                              {
                                id: item.idVac,
                                meses: userControl.edad,
                                nombre: item.nombreVac,
                              }
                            ]
                          }
                          setShowSpinner(true);
                          insertContVaccApi(formData, token).then(response => {
                            setShowSpinner(false);
                            console.log(response);
                            if(response === true){
                              setShowSpinner(false);
                              swal("¡Excelente, registro exitoso!, El control de vacunas fue almacenado correctamente", {
                                icon: "success",
                              }).then((value) => {
                                setGoRedirect(true);
                              });
                            }else{
                              setShowSpinner(false);
                              swal("Opss! Ocurrió un error!", {
                                icon: "error",
                              }).then((value) => {
                                setGoRedirect(true);
                              });
                            }
                          });
                      });
                    }}
                    >
                    {props => {
                        const { values, touched, errors, dirty, isSubmitting,
                                handleChange, handleBlur, handleSubmit, handleReset
                        } = props;
                        return (   
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí el lote" size="ls" id="lote" name="lote" 
                                value={values.lote} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.lote && touched.lote}
                                isValid={!errors.lote && touched.lote}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lote}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí la institución" size="ls" id="institucion" name="institucion" 
                                value={values.institucion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.institucion && touched.institucion}
                                isValid={!errors.institucion && touched.institucion}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.institucion}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí el nombre del profesional" size="ls" id="profesional" name="profesional" 
                                value={values.profesional} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.profesional && touched.profesional}
                                isValid={!errors.profesional && touched.profesional}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.profesional}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>

                            <div className="d-grid gap-2 mt-3">
                        <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                        {showSpinner ? (
                            <>
                            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                            {"  " + `  Cargando...`}  
                            </>
                        ):(
                            "Guardar" 
                        )}
                        </Button>
                        </div>

                            </Form>
                                );
                            }}
                        </Formik> 

</Modal.Body>
        </Modal>
              {goRedirect && (
                   <Redirect to={`/admin/listVaccines/${userControl.documento}`} />
              )}

            <Row style={{backgroundColor: '#f1f1f1'}} >
              <Col sm={1}> </Col> 
                <Col sm={10} > 
                  <Form onSubmitCapture={saveControlVac}>       
                      <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3" style={{"fontSize": "12px !important"}}>Fecha actual</Form.Label>
                      <Col sm="4">
                        <InputGroup hasValidation>
                            <Form.Control type="date" size="lg" id="fechaActual" name="fechaActual" 
                              value={moment().format('YYYY-MM-DD')} disabled
                            />
                        </InputGroup>
                      </Col>
                      
                      <Col sm="1"></Col>

                      <Form.Label column sm="2" style={{"fontSize": "12px !important"}}>Edad Usuario</Form.Label>
                      <Col sm="2">
                      <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí la edad" size="lg" id="edad" name="edad" 
                                value={`${userControl.edad} meses`} is disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                jeje
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      </Form.Group> 
                    

                      <Table striped bordered hover>
                        <thead style={{"backgroundColor": "#586DB9", "text-align": "center",}}>
                          <tr>
                            <th>Edad</th>
                            <th>Me protege de</th>
                            <th>Dosis</th>
                            <th>Fecha de Aplicación</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td rowspan="2">Recién nacido</td>
                              <td>Tuberculosis B.C.G </td>
                              <PintarCampo text="Única" dosis={1} nameVac="Tuberculosis B.C.G" sufijoVac="Tuberculosis_0"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Hepatitis B</td>
                              <PintarCampo text="Recién nacido" dosis={1} nameVac="Hepatitis B" sufijoVac="Hepatitis_0"/>
                          </tr>

                          <br/>

                          {userControl.edad >= 2 && (<>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td rowspan="4">2 Meses</td>
                              <td>Polio (Oral – IM)</td>
                              <PintarCampo text="1" dosis={1} nameVac="Polio (Oral – IM)" sufijoVac="Polio_2"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)</td>
                              <PintarCampo text="1" dosis={1} nameVac="PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)" sufijoVac="PENTAVALENTE_2"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Rotavirus</td>
                              <PintarCampo text="1" dosis={1} nameVac="Rotavirus" sufijoVac="Rotavirus_2"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Neumococo</td>
                              <PintarCampo text="1" dosis={1} nameVac="Neumococo" sufijoVac="Neumococo_2"/>
                          </tr>
                          </>)}


                          <br/>

                          {userControl.edad >= 4 && (<>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td rowspan="4">4 Meses</td>
                              <td>Polio (Oral – IM)</td>
                              <PintarCampo text="2" dosis={2} nameVac="Polio (Oral – IM)" sufijoVac="Polio_4"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)</td>
                              <PintarCampo text="2" dosis={2} nameVac="PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)" sufijoVac="PENTAVALENTE_4"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Rotavirus</td>
                              <PintarCampo text="2" dosis={2} nameVac="Rotavirus" sufijoVac="Rotavirus_4"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Neumococo</td>
                              <PintarCampo text="2" dosis={2} nameVac="Neumococo" sufijoVac="Neumococo_4"/>
                          </tr>
                          </>)}


                          <br/>


                          {userControl.edad >= 6 && (<>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td rowspan="4">6 Meses</td>
                              <td colspan="2">Continúe la lactancia materna hasta que cumpla dos años e inicie <br/> alimentación complementaria nutritiva</td>
                              <td></td>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Polio (Oral – IM)</td>
                              <PintarCampo text="3" dosis={3} nameVac="Polio (Oral – IM)" sufijoVac="Polio_6"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)</td>
                              <PintarCampo text="3" dosis={3} nameVac="PENTAVALENTE: Hepatitis B, Haemophilus, Influenza Tipo B y Difteria – Tosferina – Tétano (DPT)" sufijoVac="PENTAVALENTE_6" />
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Influenza</td>
                              <PintarCampo text="1" dosis={1} nameVac="Influenza" sufijoVac="Influenza_6"/>
                          </tr>
                          </>)}
                          

                          <br/>


                          {userControl.edad >= 7 && (<>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>7 Meses</td>
                              <td>Influenza</td>
                              <PintarCampo text="2" dosis={2} nameVac="Influenza" sufijoVac="Influenza_7"/>
                          </tr>
                          </>)}


                          <br/>

                          {userControl.edad >= 12 && (<>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td rowspan="5">12 Meses</td>
                              <td>Sarampión Rubéola Paperas (SRP)</td>
                              <PintarCampo text="1" dosis={1} nameVac="Sarampión Rubéola Paperas (SRP)" sufijoVac="Sarampion_12"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Fiebre Amarilla</td>
                              <PintarCampo text="1" dosis={1} nameVac="Fiebre Amarilla" sufijoVac="Fiebre_12"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Neumococo</td>
                              <PintarCampo text="Refuerzo" dosis={3} nameVac="Neumococo" sufijoVac="Neumococo_12" />
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Influenza</td>
                              <PintarCampo text="Anual" dosis={3} nameVac="Influenza" sufijoVac="Influenza_12"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Hepatitis A</td>
                              <PintarCampo text="ÚNICA" dosis={1} nameVac="Hepatitis A" sufijoVac="Hepatitis_12"/>
                          </tr>
                          </>)}
                            

                          <br/>


                          {userControl.edad >= 18 && (<>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td rowspan="2">18 Meses</td>
                              <td>Difteria – Tosferina – Tétano (DPT)</td>
                              <PintarCampo text="1 Refuerzo" dosis={1} nameVac="Difteria – Tosferina – Tétano (DPT)" sufijoVac="Difteria_18"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Polio (Oral – IM)</td>
                              <PintarCampo text="1 Refuerzo" dosis={4} nameVac="Polio (Oral – IM)" sufijoVac="Polio_18" />
                          </tr>
                          </>)}
                                

                          <br/>


                          {userControl.edad >= 60 && (<>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td rowspan="3">5 Años</td>
                              <td>Polio (Oral – IM)</td>
                              <PintarCampo text="2 Refuerzo" dosis={5} nameVac="Polio (Oral – IM)" sufijoVac="Polio_60"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Difteria – Tosferina – Tétano (DPT)</td>
                              <PintarCampo text="2 Refuerzo" dosis={2} nameVac="Difteria – Tosferina – Tétano (DPT)" sufijoVac="Difteria_60"/>
                          </tr>
                          <tr style={{"text-align": "center", "vertical-align": "middle"}}>
                              <td>Sarampión Rubéola Paperas (SRP)</td>
                              <PintarCampo text="Refuerzo" dosis={2} nameVac="Sarampión Rubéola Paperas (SRP)" sufijoVac="Sarampion_60"/>
                          </tr>
                          </>)}
                          
                        </tbody>
                      </Table>



                    <div className="d-grid gap-2 mb-4">
                        <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                          {showSpinner ? (
                                <>
                                <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                                {"  " + `  Cargando...`}  
                                </>
                                ):(
                                "Actualizar Control" 
                            )}
                        </Button>
                    </div>

                </Form>
              </Col>
              <Col sm={1}></Col>
            </Row>
        </Container>
    )

}