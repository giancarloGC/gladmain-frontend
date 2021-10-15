import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { insertRolApi } from "../../api/rol";
import { TOKEN } from "../../utils/constans";
import { getPrivilegiosApi } from "../../api/consultar_privilegios";
import { useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth'; //privilegios
import swal from 'sweetalert';
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function AddRol(){
    const { latestRol } = useParams();
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const { user } = useAuth(); //privilegios
    const [ listPrivilegios, setListPrivilegios ] = useState([]);
    const [ privilegiosSelected, setPrivilegiosSelected ] = useState([]);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ authorization, setAuthorization ] = useState(true);
    
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        (async () => {
            if(validatePrivilegio("CONSULTAR_PRIVILEGIOS").length > 0){
                const responsePrivilegios = await getPrivilegiosApi(token);
                console.log(responsePrivilegios);
                let tal = responsePrivilegios.sort(function (a, b){
                    return (a.id - b.id)
                });
                console.log(tal);
                
                setListPrivilegios(responsePrivilegios);
            }
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
                <h1 className="text-center">Formulario de Rol</h1>

                <Row >
                    <Col> 
                    <Formik
                    initialValues={{ name: '' }}
                    validate={(valores) => {
                    let errores = {};
                    if(!valores.name){
                        errores.name = 'No se permiten campos vacíos'
                    }
                    return errores;
                    }}
                    onSubmit={(valores, {resetForm}) => {
                        if(privilegiosSelected.length === 0){
                            swal("¡Opss, No has seleccionado funciones, Debes seleccionar al menos una función para el rol!", {
                                    icon: "error",
                            });
                            setShow(true);
                            setTimeout(() => {
                                setShow(false);
                            }, 3000);
                        }else{
                            valores.token = token;
                            valores.privilegios = privilegiosSelected;
                            valores.latestRol = latestRol;
                            console.log(valores);

                            setShowSpinner(true);
                            insertRolApi(valores).then(response => {
                                setShowSpinner(false);
                                if(response === true){
                                    setShowSpinner(false);
                                    swal("¡Excelente, registro exitoso!, El rol fue almacenado correctamente", {
                                        icon: "success",
                                    })
                                    .then((value) => {
                                        window.location.replace(`/admin/roles`);
                                    });
                                    setShow(true);
                                }else{
                                    setShowSpinner(false);
                                    swal("Opss! Ocurrió un error al registrar el rol!", {
                                        icon: "error",
                                    }).then((value) => {
                                        window.location.replace(`/admin/roles`);
                                    });;
                                    setShow(true);
                                }
                            });
                                
                            setTimeout(() => {
                                setShow(false);
                            }, 5000);
                        }
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
                                <Form.Control type="text" placeholder="Dígita aquí el nombre del rol" size="lg" id="name" name="name" 
                                value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name && touched.name}
                                isValid={!errors.name && touched.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
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

                        <Container style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}}>
                            <fieldset >
                                <legend>Seleccione las funciones que tendrá el rol</legend>
                                <Row className="mb-3">
                                <Col>
                                    {listPrivilegios.map((item, index) => (
                                        index <= 18 && (
                                            <Form.Check type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                                        )
                                    ))}
                                </Col>

                                <Col>
                                    {listPrivilegios.map((item, index) => (
                                        index > 18 && index <= 37 && (
                                            <Form.Check type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                                        )
                                    ))}
                                </Col>

                                <Col >
                                    {listPrivilegios.map((item, index) => (
                                        index > 37 && index <= 55 && (
                                            <Form.Check type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                                        )
                                    ))}
                                </Col>
                                </Row>
                            </fieldset>
                        </Container>
                        <div className="d-grid gap-2 mt-3">
                        <Button variant="primary" type="submit" size="lg" disabled={showSpinner}>
                        {showSpinner ? (
                            <>
                            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
                            {"  " + `  Cargando...`}  
                            </>
                        ):(
                            "Añadir" 
                        )}
                        </Button>
                        </div>

                        </Form>
                                );
                            }}
                        </Formik> 
                    </Col>
                </Row>
            </Container>
        )
    }
}