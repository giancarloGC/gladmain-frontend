import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner, ListGroup, ListGroupItem, Card} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { addControlAdicionalApi, getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import { getPrivilegiosApi } from "../../api/consultar_privilegios";
import { useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth'; //privilegios
import swal from 'sweetalert';
import Lottie from 'react-lottie';
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";
import ImageMen from "../../assets/img/men.png";
import ImageWomen from "../../assets/img/women.png";
import ImageNino from "../../assets/img/nino.png";
import ImageNina from "../../assets/img/nina.png";

export default function AddControlAdicional(){
    const { documento, typeControl } = useParams();
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const { user } = useAuth(); //privilegios
    const [ listPrivilegios, setListPrivilegios ] = useState([]);
    const [ privilegiosSelected, setPrivilegiosSelected ] = useState([]);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ authorization, setAuthorization ] = useState(true);
    const [usuario, setUser] = useState({});
      const [ userLoaded, setUserLoaded ] = useState(false);
    
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        (async () => {
            getUserByIdApi(documento, token).then(response => {
                console.log(response);
                  setUser(response);
                  setUserLoaded(true);
              })
                const responsePrivilegios = await getPrivilegiosApi(token);
                console.log(responsePrivilegios);
                let tal = responsePrivilegios.sort(function (a, b){
                    return (a.id - b.id)
                });
                console.log(tal);
                
                setListPrivilegios(responsePrivilegios);
        })();
    }, []);

    const formatedDate = (date) => {
        let newDate = date.split("T");
       return newDate[0];
    };
    
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
                <h1 className="text-center">Formulario de Control {typeControl === '1' && 'Psicosocial'} {typeControl === '2' && 'Educación'} {typeControl === '3' && 'Promoción y Prevención'}</h1>
                {!userLoaded ? (
          <Row className="justify-content-md-center text-center">
              <Col md={1} className="justify-content-center">
              <Spinner animation="border" >
              </Spinner> 
              </Col>
          </Row>
        )
        :
        (
                <Row >
                    <Col> 
                    <Formik
                    initialValues={{ name: '', descripcion: '', profesional: '' }}
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
                                    idUsuario: documento,
                                    nombreProceso: valores.name,
                                    descripcion: valores.descripcion,
                                    nombreProfesional: valores.profesional,
                                    tipoControl: parseInt(typeControl),
                                    token: token
                                };
                                setShowSpinner(true);
                                addControlAdicionalApi(data).then(response => {
                                setShowSpinner(false);
                                if(response === true){
                                    setShowSpinner(false);
                                    swal("¡Excelente, registro exitoso!, El control fue almacenado correctamente", {
                                        icon: "success",
                                    })
                                    .then((value) => {
                                        window.location.replace(`/admin/users/controlesAdicionales/${documento}`);
                                    });
                                    setShow(true);
                                }else{
                                    setShowSpinner(false);
                                    swal("Opss! Ocurrió un error al registrar el control!", {
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
            
            <center>
            <Card style={{width: 'auto', height: 'auto'}} className='mt-3' >
            {usuario.edad > 216 ? 
                            <Card.Img variant="top" src={usuario.sexo === "FEMENINO" ? ImageWomen : ImageMen} style={{"max-width": "200px"}} roundedCircle className="row justify-content-center align-self-center mt-3"/>
                        :
                        <Card.Img variant="top" src={usuario.sexo === "FEMENINO" ? ImageNina : ImageNino} style={{"max-width": "200px"}} roundedCircle className="row justify-content-center align-self-center mt-3"/>
                            
                    }            

            <Card.Body style={{backgroundColor: '#0084d2'}}>
            <Card.Title className="text-center" style={{"fontWeight":"bold", "color":"white"}}> {usuario.nombre}</Card.Title>
            </Card.Body>
            </Card>
            </center>

            <Row>
            <Col md={1}> </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem style={{"fontSize": "16px", "color":"#0084d2", "fontWeight":"bold" }}>Fecha de inclusión:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem style={{"fontSize": "16px", "fontWeight":"bold"}}>{usuario.fechaIngresoPrograma ? formatedDate(usuario.fechaIngresoPrograma) : 'Ninguna'}</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={1}> </Col>
            </Row>

            <Row>
            <Col md={1}> </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "color":"#0084d2", "fontWeight":"bold" }}>Numero de Documento:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
            <ListGroupItem className='mt-1' style={{"fontSize": "16px", "fontWeight":"bold"}}>{usuario.documento}</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={1}> </Col>
            </Row>

            <Row>
            <Col md={1}> </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "color":"#0084d2", "fontWeight":"bold" }}>Fecha de Nacimiento:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "fontWeight":"bold"}}>{formatedDate(usuario.fechaNacimiento)}</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={1}> </Col>
            </Row>

            <Row>
            <Col md={1}> </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "color":"#0084d2", "fontWeight":"bold" }}>Edad:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
               <ListGroupItem className='mt-1' style={{"fontSize": "16px", "fontWeight":"bold"}}>{`${usuario.edad} meses`}</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={1}> </Col>
            </Row>

            <Row>
            <Col md={1}> </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "color":"#0084d2", "fontWeight":"bold" }}>Celular:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "fontWeight":"bold"}}>{usuario.celular}</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={1}> </Col>
            </Row>

            <Row>
            <Col md={1}> </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "color":"#0084d2", "fontWeight":"bold" }}>Municipio:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "fontWeight":"bold"}}>{usuario.municipio}</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={1}> </Col>
            </Row>

            <Row>
            <Col md={1}> </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "color":"#0084d2", "fontWeight":"bold" }}>Dirección:</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={5} className='mt-2'>
            <ListGroup className="list-group-flush ">
              <ListGroupItem className='mt-1' style={{"fontSize": "16px", "fontWeight":"bold"}}>{usuario.direccion}</ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={1}> </Col>
            </Row>



                            <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control type="text" placeholder="Dígita aquí el nombre del proceso" size="lg" id="name" name="name" 
                                value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name && touched.name}
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
                               value={values.descripcion} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.descripcion && touched.descripcion}
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
                                value={values.profesional} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.profesional && touched.profesional}
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
        )}
            </Container>
        )
    }
}