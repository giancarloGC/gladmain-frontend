import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { getControlAdicionalByIdApi, editControlAdicionalApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import { getPrivilegiosApi } from "../../api/consultar_privilegios";
import { useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth'; //privilegios
import swal from 'sweetalert';
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function EditControlAdicional(){
    const { documento, typeControl, idControl } = useParams();
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const { user } = useAuth(); //privilegios
    const [ infoControl, setInfoControl ] = useState({
        id: parseInt(idControl),
        idUsuario: parseInt(documento),
        nombreProceso: "",
        descripcion: "",
        nombreProfesional: "",
        tipoControl: parseInt(typeControl) 

    });
    const [ listPrivilegios, setListPrivilegios ] = useState([]);
    const [ privilegiosSelected, setPrivilegiosSelected ] = useState([]);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ authorization, setAuthorization ] = useState(true);
    const [ loaded, setLoaded ] = useState(false);
    
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        (async () => {
            const data = {
                token: token,
                id: parseInt(idControl)
            };
            const controlInfo = await getControlAdicionalByIdApi(data);
            setInfoControl(controlInfo);
            setLoaded(true);
        })();
    }, []);
    
    const handleCheck = (e, item) => {
        let privilegio = {
            id: item.id,
            nombre: item.nombre
        }
        if(e.target.checked){
            setPrivilegiosSelected([...privilegiosSelected, privilegio]);
        }else{
            const result = privilegiosSelected.filter((priv) => {
                return priv.id != item.id && priv.nombre != item.nombre;
            });
            setPrivilegiosSelected(result);
        }
    }

    if(validatePrivilegio("REGISTRAR_ROL").length === 0){
        return(
            <>
                <h1 style={{"textAlign": "center"}}>No tienes autorización</h1>
                    <Lottie height={500} width="65%"
                    options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
            </>
        )
    }else{
        return(
            <Container>
                <h1 className="text-center">Edición de Control {typeControl === '1' && 'Psicosocial'} {typeControl === '2' && 'Educación'} {typeControl === '3' && 'Promoción y Prevención'}</h1>

                {loaded ? (
                <Row >
                    <Col> 
                    <Formik
                    initialValues={{ name: infoControl.nombreProceso, descripcion: infoControl.descripcion, profesional: infoControl.nombreProfesional }}
                    validate={(valores) => {
                    let errores = {};
                    if(!valores.name){
                        errores.name = 'No se permiten campos vacíos'
                    }
                    if(!valores.descripcion){
                        errores.descripcion = 'No se permiten campos vacíos'
                    }
                    if(!valores.profesional){
                        errores.profesional = 'No se permiten campos vacíos'
                    }
                    return errores;
                    }}
                    onSubmit={(valores, {resetForm}) => {
                                const data = {
                                    id: infoControl.id,
                                    idUsuario: parseInt(documento),
                                    nombreProceso: valores.name,
                                    descripcion: valores.descripcion,
                                    nombreProfesional: valores.profesional,
                                    tipoControl: parseInt(typeControl),
                                    token: token
                                };
                                setShowSpinner(true);
                                console.log(data);
                                editControlAdicionalApi(data).then(response => {
                                    console.log(response);
                                setShowSpinner(false);
                                if(response === true){
                                    setShowSpinner(false);
                                    swal("¡Excelente, registro exitoso!, El control fue actualizado correctamente", {
                                        icon: "success",
                                    })
                                    .then((value) => {
                                        window.location.replace(`/admin/users/controlesAdicionales/${documento}`);
                                    });
                                    setShow(true);
                                }else{
                                    setShowSpinner(false);
                                    swal("Opss! Ocurrió un error al actualizar el control!", {
                                        icon: "error",
                                    }).then((value) => {
                                        window.location.replace(`/admin/users/controlesAdicionales/${documento}`);
                                    });;
                                    setShow(true);
                                }
                            });
                                
                            setTimeout(() => {
                                setShow(false);
                            }, 5000);
                        
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
                                <Form.Control type="text" placeholder="Dígita aquí el nombre del proceso" size="lg" id="name" name="name" 
                                defaultValue={infoControl.nombreProceso} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name && touched.name}
                                isValid={!errors.name && touched.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                            <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Descripción " size="lg" id="descripcion" name="descripcion" 
                               defaultValue={infoControl.descripcion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.descripcion && touched.descripcion}
                               isValid={!errors.descripcion && touched.descripcion}
                            />
                                                            <Form.Control.Feedback type="invalid">
                                    {errors.descripcion}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">


                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí el nombre del profesional" size="lg" id="profesional" name="profesional" 
                                defaultValue={infoControl.nombreProfesional} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.profesional && touched.profesional}
                                isValid={!errors.profesional && touched.profesional}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.profesional}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>

                            {show && (
                            <Alert variant={textFormSend.variant} onClose={() => setShow(false)} dismissible className="mt-5">
                                <Alert.Heading>{textFormSend.heading}</Alert.Heading>
                                <p style={{"color": textFormSend.variant === "success" ? "#2DA45C" : "#A42D55", "font-size": 18}}>
                                {textFormSend.message}
                                </p>
                            </Alert>
                        )}



                        <div className="d-grid gap-2 mt-3">
                        <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                        {showSpinner ? (
                            <>
                            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                            {"  " + `  Cargando...`}  
                            </>
                        ):(
                            "Actualizar" 
                        )}
                        </Button>
                        </div>

                        </Form>
                                );
                            }}
                        </Formik> 
                    </Col>
                </Row>
                                )
                                :
                                (
                                    <Row className="justify-content-md-center text-center">
                                    <Col md={1} className="justify-content-center">
                                    <Spinner animation="border" >
                                    </Spinner> 
                                    </Col>
                                    </Row>        
                                )
                                }
            </Container>
        )
    }
}