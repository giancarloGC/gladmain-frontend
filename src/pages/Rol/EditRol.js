import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { getRolByIdApi, updateRolApi } from "../../api/rol";
import { TOKEN } from "../../utils/constans";
import { getPrivilegiosApi } from "../../api/consultar_privilegios";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import useAuth from '../../hooks/useAuth'; //privilegios
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

export default function EditRol(){
    const { idRol } = useParams();
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ listPrivilegios, setListPrivilegios ] = useState([]);
    const [ privilegiosSelected, setPrivilegiosSelected ] = useState([]);
    const [ infoRol, setInfoRol ] = useState({rol: {}, privilegios: {}});
    const [ name, setName ] = useState({ name: ''});
    const [ loaded, setLoaded] = useState(false);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ authorization, setAuthorization ] = useState(true);
    const { user } = useAuth(); //privilegios

    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        (async () => {
            if(validatePrivilegio("ACTUALIZAR_ROL").length > 0){
            const responseRol = await getRolByIdApi(idRol, token);
            const responsePrivilegios = await getPrivilegiosApi(token);
            let tal = responsePrivilegios.sort(function (a, b){
                return (a.id - b.id)
            });
            setInfoRol({rol: responseRol.rol, privilegios: responseRol.privilegios});
            setName({name: responseRol.rol.nombre});
            setListPrivilegios(responsePrivilegios);
            setLoaded(true);
            }
        })();
    }, []);

    const handleCheck = (e, item) => {
        let privilegio = {
            id: item.id,
            nombre: item.nombre
        }
        if(e.target.checked){
            setInfoRol({rol: infoRol.rol, privilegios: [...infoRol.privilegios, privilegio]});
        }else{
            const result = infoRol.privilegios.filter((priv) => {
                return priv.id != item.id && priv.nombre != item.nombre;
            });
            setInfoRol({rol: infoRol.rol, privilegios: result});
        }
    }

    const checkPrivilegio = (item) => {
        const result = infoRol.privilegios.filter(privilegio => privilegio.nombre === item.nombre);
        let checked = false;
        if(result.length > 0){
            checked = true;
        }
        return    <Form.Check type="checkbox" label={item.nombre} defaultChecked={checked} onChange={(e) => handleCheck(e, item)}/>
    }

    if(validatePrivilegio("ACTUALIZAR_ROL").length === 0){
        return(
            <>
                <h1 style={{"textAlign": "center"}}>No tienes autorizaci??n</h1>
                    <Lottie height={500} width="65%"
                    options={{ loop: true, autoplay: true, animationData: AnimationAuthorization, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
            </>
        )
    }else{
        return(
            <Container>
                <h1 className="text-center">Editar Rol</h1>
                {loaded ? (
                <Row>
                    <Col> 
                    <Formik
                    initialValues={ name }
                    validate={(valores) => {
                    let errores = {};
                    return errores;
                    }}
                    onSubmit={(valores, {resetForm}) => {
                        if(infoRol.privilegios.length === 0){
                            swal("??Opss, No has seleccionado funciones, Debes seleccionar al menos una funci??n para el rol!", {
                                icon: "error",
                            });
                            setShow(true);
                            setTimeout(() => {
                                setShow(false);
                            }, 3000);
                        }else{
                            infoRol.rol.nombre = valores.name;
                            setShowSpinner(true);
                            resetForm();
                            updateRolApi(infoRol, token).then(response => {
                                setShowSpinner(false);
                                if(response === true){
                                    swal("??Excelente, registro exitoso!, El rol fue actualizado correctamente", {
                                        icon: "success",
                                    })
                                    .then((value) => {
                                        window.location.replace("/admin/roles");
                                    }); 
                                    setShow(true);
                                }else{
                                    setShowSpinner(false);
                                    swal("Opss! Ocurri?? un error al editar el rol!", {
                                        icon: "error",
                                    }).then((value) => {
                                        window.location.replace("/admin/roles");
                                    });
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
                            {infoRol && (
                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="D??gita aqu?? el nombre del rol" size="lg" id="name" name="name" 
                                defaultValue={infoRol.rol.nombre} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name && touched.name}
                                isValid={!errors.name && touched.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
    )}
                            {show && (
                            <Alert variant={textFormSend.variant} onClose={() => setShow(false)} dismissible className="mt-5">
                                <Alert.Heading>{textFormSend.heading}</Alert.Heading>
                                <p style={{"color": textFormSend.variant === "success" ? "#2DA45C" : "#A42D55", "fontSize": 18}}>
                                {textFormSend.message}
                                </p>
                            </Alert>
                        )}

                            <fieldset>
                                <legend>Seleccione las funciones que tendr?? el rol</legend>
                                <Row className="mb-3" style={{backgroundColor: '#f1f1f1', borderRadius:'5px'}}>
                                <Col>
                                    {listPrivilegios.map((item, index) => (
                                        index <= 18 && (
                                            checkPrivilegio(item)
                                        )
                                    ))}
                                </Col>

                                <Col>
                                    {listPrivilegios.map((item, index) => (
                                        index > 18 && index <= 37 && (
                                            checkPrivilegio(item)
                                        )
                                    ))}
                                </Col>

                                <Col>
                                    {listPrivilegios.map((item, index) => (
                                        index > 37 && index <= 55 && (
                                            checkPrivilegio(item)                                    
                                        )
                                    ))}
                                </Col>
                                </Row>
                            </fieldset>

                        <div className="d-grid gap-2">
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