import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { insertRolApi } from "../../api/rol";
import { TOKEN } from "../../utils/constans";
import { getPrivilegiosApi } from "../../api/consultar_privilegios";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

export default function AddRol(){
    const { latestRol } = useParams();
    const [ textFormSend, setTextFormSend ] = useState({});
    const token = localStorage.getItem(TOKEN);
    const [show, setShow] = useState(false);
    const [ listPrivilegios, setListPrivilegios ] = useState([]);
    const [ privilegiosSelected, setPrivilegiosSelected ] = useState([]);
    console.log(listPrivilegios);
    useEffect(() => {
        (async () => {
            const responsePrivilegios = await getPrivilegiosApi(token);
            console.log(responsePrivilegios);
            let tal = responsePrivilegios.sort(function (a, b){
                return (a.id - b.id)
            });
            console.log(tal);
            
            setListPrivilegios(responsePrivilegios);
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
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.name)){
                    errores.name = 'Nombre incorrecto, solo puedes escribir letras';
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
                        
                        insertRolApi(valores).then(response => {
                            if(response === true){
                                swal("¡Excelente, registro exitoso!, El rol fue almacenado correctamente", {
                                    icon: "success",
                                })
                                .then((value) => {
                                    window.location.replace(`/admin/roles`);
                                });
                                setShow(true);
                            }else{
                                swal("Opss! Ocurrió un error al registrar el rol!", {
                                    icon: "error",
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
                        <Form.Group className="mb-3">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Dígita aquí el nombre del rol" size="lg" id="name" name="name" 
                            value={values.name.toUpperCase()} onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.name && touched.name}
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
                            <Col md={4}>
                                {listPrivilegios.map((item, index) => (
                                    index <= 17 && (
                                        <Form.Check type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                                    )
                                ))}
                            </Col>

                            <Col md={4}>
                                {listPrivilegios.map((item, index) => (
                                    index > 17 && index <= 35 && (
                                        <Form.Check type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                                    )
                                ))}
                            </Col>

                            <Col md={4}>
                                {listPrivilegios.map((item, index) => (
                                    index > 35 && index <= 54 && (
                                        <Form.Check type="checkbox" label={item.nombre} onChange={(e) => handleCheck(e, item)}/>
                                    )
                                ))}
                            </Col>
                            </Row>
                        </fieldset>
                    </Container>

                        <div className="d-grid gap-2 mt-3">
                            <Button variant="primary" type="submit" size="lg">
                                Añadir
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