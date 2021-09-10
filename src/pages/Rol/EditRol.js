import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { getRolByIdApi, updateRolApi } from "../../api/rol";
import { TOKEN } from "../../utils/constans";
import { getPrivilegiosApi } from "../../api/consultar_privilegios";
import { useParams } from "react-router-dom";


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
    useEffect(() => {
        (async () => {
            const responseRol = await getRolByIdApi(idRol, token);
            const responsePrivilegios = await getPrivilegiosApi(token);
            let tal = responsePrivilegios.sort(function (a, b){
                return (a.id - b.id)
            });
            setInfoRol({rol: responseRol.rol, privilegios: responseRol.privilegios});
            setName({name: responseRol.rol.nombre});
            setListPrivilegios(responsePrivilegios);
            setLoaded(true);
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
                  if(!valores.name){
                    errores.name = 'No se permiten campos vacíos'
                  }else if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(valores.name)){
                    errores.name = 'Nombre incorrecto, solo puedes escribir letras';
                  }

                  return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                    if(infoRol.privilegios.length === 0){
                        setTextFormSend({
                            variant: "danger", heading: "¡Opss, No has seleccionado funciones!",
                            message: `Debes seleccionar al menos una función para el rol`
                        });
                        setShow(true);
                        setTimeout(() => {
                            setShow(false);
                        }, 3000);
                    }else{
                        infoRol.rol.nombre = valores.name;
                        resetForm();
                        updateRolApi(infoRol, token).then(response => {
                            if(response === true){
                                setTextFormSend({
                                    variant: "success", heading: "¡Excelente, registro exitoso!",
                                    message: `El rol ${valores.name} fue almacenado correctamente`
                                });
                                setShow(true);
                            }else{
                                setTextFormSend({
                                    variant: "danger", heading: "¡Opss, ocurrió un error!",
                                    message: "Revisaremos lo ocurrido, inténtalo nuevamente"
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
                            <Form.Control type="text" placeholder="Dígita aquí el nombre del rol" size="lg" id="name" name="name" 
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
                            <p style={{"color": textFormSend.variant === "success" ? "#2DA45C" : "#A42D55", "font-size": 18}}>
                            {textFormSend.message}
                            </p>
                        </Alert>
                    )}

                        <fieldset>
                            <legend>Seleccione las funciones que tendrá el rol</legend>
                            <Row className="mb-3">
                            <Col md={4}>
                                {listPrivilegios.map((item, index) => (
                                    index <= 17 && (
                                        checkPrivilegio(item)
                                    )
                                ))}
                            </Col>

                            <Col md={4}>
                                {listPrivilegios.map((item, index) => (
                                    index > 17 && index <= 35 && (
                                        checkPrivilegio(item)
                                    )
                                ))}
                            </Col>

                            <Col md={4}>
                                {listPrivilegios.map((item, index) => (
                                    index > 35 && index <= 53 && (
                                        checkPrivilegio(item)                                    
                                    )
                                ))}
                            </Col>
                            </Row>
                        </fieldset>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Actualizar
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