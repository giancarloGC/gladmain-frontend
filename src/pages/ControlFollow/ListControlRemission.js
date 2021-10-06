import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListControlR from "../../components/Control/ControlFollow/ListControlR";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { useParams } from "react-router-dom";
import { getRemisByUserApi } from "../../api/remission";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";


export default function ListControlRemission(){
  const { idSeg, documento } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [ infoUser, setInfoUser ] = useState(null);
  const [ listRemis, setListRemis ] = useState([]);
  const [ allRemisionsSaved, setAllRemisions ] = useState([]);

  useEffect(() => {
      getUserByIdApi(documento, token).then(responseUser => {
          setInfoUser(responseUser);
      });
      getRemisByUserApi(documento, token).then(response => {
          console.log(response);
          let remisionesBySeg = response.filter(remission => remission.idSeguimiento === parseInt(idSeg));

          setListRemis(remisionesBySeg);
          setAllRemisions(remisionesBySeg);
      });
  }, []);

  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');
    return dateFormated[0];
    }
  };

  const onChangeBusqueda = (e) => {
    var remisionsFiltred = allRemisionsSaved.filter(user => dateFormat(user.fechaRemision) === e.target.value);
    setListRemis(remisionsFiltred);
}

    return(
        <Container>
            <h1 className="text-center mb-4">Remisiones de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addControlRemission/${idSeg}/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nueva Remision </ReactTooltip>
              </Link>
              
              <FontAwesomeIcon icon={faPrint} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton2" />
              <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
            </h1>
            <Container className="mt-4"> 
            <Row className="mb-2 mt-3">
                    <Col md={3}> </Col>
                    <Col md={6}>
                    <Form.Group as={Row} className="mt-2 " style={{ "marginLeft":"6px"}}>
                        <Form.Label>
                        <h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">Buscar seguimiento</h1></Form.Label>

                       <InputGroup hasValidation>
                           <Form.Control type="date" size="sm" id="busqueda" name="busqueda" 
                                onChange={(e) => onChangeBusqueda(e)}
                           />
                       </InputGroup>
                       </Form.Group>
                    </Col>
                    <Col md={3}> </Col>
            </Row>
            </Container>
            
            {listRemis.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            {listRemis.length > 0 && (
             <ListControlR listRemis={listRemis} allRemisionsSaved={allRemisionsSaved}
             setListRemis={setListRemis} idSeg={idSeg} documento={documento}
            />
            )}
                        
        </Container>
    )
}