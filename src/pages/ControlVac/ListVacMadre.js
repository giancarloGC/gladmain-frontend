import React, {useState, useEffect} from 'react';
import { Container, ListGroup, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, useParams} from "react-router-dom";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import ListVMadre from "../../components/Control/ControlVac/ListVMadre";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getContVaccApi } from "../../api/vaccination";
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";

Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});

function DocumentPdf({userControl, listControls, setLoadedSonPDF}){
    
    useEffect(() => {
        setLoadedSonPDF(true);
    }, [])
    
    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
      }

    return(
        <Document>
        <Page style={styles.body}>
        <View style={styles.table2}> 
            <View style={styles.tableRow2}> 
                <View style={styles.tableCol2}> 
                    <View style={styles.viewImage}>
                        <Image 
                        style={styles.image}
                        src={Logo}
                        />                
                    </View>
                </View>
                <View style={styles.tableCol3}> 
                    <Text style={{fontSize: 20, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Controles de Vacunación</Text>
                    <Text style={{fontSize: 16, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth2'}}>Fecha: {moment().format("DD-MM-YYYY")}</Text>
                </View>
                <View style={styles.tableCol2}> 
                    <View style={styles.viewImage2}>
                        <Image 
                        style={styles.image}
                        src={GladMaIn}
                        />             
                    </View>
                </View>
            </View> 
        </View> 

        <Text style={{fontSize: 10, textAlign: "center"}}>-------------------------------------------------------------------------------------------------------------------------------------------------------</Text>

            <View style={styles.tableUser}> 
            <View style={styles.tableRowUser}> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Documento:</Text> 
              </View> 
                    <View style={styles.tableColUser2}> 
                        <Text style={styles.tableCell}>{userControl.documento}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Usuario:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{userControl.nombre}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Fecha Nacimiento:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{dateFormat(userControl.fechaNacimiento)}</Text> 
                    </View> 
            </View>
            <View style={styles.tableRowUser}> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Telefono:</Text> 
              </View> 
                    <View style={styles.tableColUser2}> 
                        <Text style={styles.tableCell}>{userControl.celular}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Municipio:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{userControl.municipio}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Dirección:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{userControl.direccion}</Text> 
                    </View> 
            </View>
            </View>

            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Nº Control</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Fecha Aplicacion</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Edad Gestacional</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Vacuna</Text> 
                    </View> 
                </View> 
            </View>
         
        {listControls.map((item, index) => (
            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{item.id}</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{dateFormat (item.fechaAplicacion)}</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{item.edadGestacional} semanas</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{item.nombreVacuna}</Text> 
                    </View> 
                </View> 
            </View>
        ))}
        </Page>
  </Document>
    )
}

export default function ListVacMadre(){ 
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [userControl, setUser] = useState({});
    const [ listControls, setListControls ] = useState([]);
    const [loaded, setLoaded] = useState(true); 
    const [ loadedPDF, setLoadedSonPDF ] = useState(false);
    const [ allControlSaved, setAllControl ] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getUserByIdApi(documento, token);
            setLoaded(false);
            setUser(response);
    
            const response2 = await getContVaccApi(documento, token);
            setLoaded(false);
            setListControls(response2);

            setAllControl(response2);
            setLoadedSonPDF(true);
        })();       
    }, []);

    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
      };
  
      const onChangeBusqueda = (e) => {
        var controlFiltred = allControlSaved.filter(user => dateFormat(user.fechaAplicacion) === e.target.value);
        setListControls(controlFiltred);
    }
    
    return(
        <Container>
            <h1 className="text-center">Controles de Vacunacion de {userControl ? userControl.nombre : "Anonimo"}
                <Link to={`/admin/addControlVacMadre/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Control </ReactTooltip>
                </Link>
                {loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf userControl={userControl} listControls={listControls} setLoadedSonPDF={setLoadedSonPDF}/>} fileName="ControlVacunación.pdf">
                    {({ blob, url, loaded, error }) =>
                        loaded ? 'Cargando Documento...' : <Button style={styles.boton}>
                        Descargar PDF <FontAwesomeIcon icon={faPrint} style = {{marginLeft:2}} size="lg" color="white" />
                    </Button>
                    }
                    </PDFDownloadLink>  
                )}
            </h1>

            <Container className="mt-4"> 
            <Row className="mt-3 justify-content-center">
                    <Col md={5}>
                    <Form.Group as={Row} >
                    <Col md={5}>
                        <Form.Label>
                        <h1 style={{fontSize: "20px", color:"#2D61A4" }} >Buscar Control </h1></Form.Label>
                    </Col>
                    <Col md={7}> 
                    <InputGroup hasValidation>
                           <Form.Control type="date" size="sm" id="busqueda" name="busqueda" 
                                onChange={(e) => onChangeBusqueda(e)}
                           />
                       </InputGroup>
                    </Col>
                       </Form.Group>                    
                    </Col>
            </Row>
            </Container>

            {loaded && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )}

            {listControls.length > 0 && (
                <ListVMadre listControls={listControls} allControlSaved={allControlSaved}  setAllControl={setAllControl}/>
             )
            }

            {listControls.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "font-size": 27}}>No se encontraron registros</p>
                <Lottie height={400} width="60%"
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            
        </Container>        
    )
}

const styles = StyleSheet.create({

    // Generales
        body: {
          paddingTop: 10,
          paddingRight: 50,
          paddingLeft: 50,
          paddingBottom: 50,
        },
        boton: {
            marginTop: 0,
            marginLeft: 5,
        },
    
    // Encabezado PDF
        image: {
            objectFit: 'cover',
        },
        viewImage: {
            width: 100,
            height: 'auto',
            padding: 0,
            backgroundColor: 'white',
            margin:'auto'
        },
        viewImage2: {
            width: 80,
            height: 'auto',
            backgroundColor: 'white',
            margin:'auto'
        },
        table2: { 
            display: "table", 
            width: "auto",
            textAlign: "center", 
          }, 
        tableRow2: { 
            margin: "auto", 
            flexDirection: "row",
            textAlign: "center",
          }, 
        tableCol2: { 
            width: "25%",
            textAlign: "center",
          },
        tableCol3: { 
            width: "50%",
            marginTop: 20,
            textAlign: "center",
          },
    
    // Listado de controles
        table: { 
          display: "table", 
          width: "auto", 
          marginTop: 10,
          backgroundColor: "#f1f1f1",
          borderRadius: 5
        }, 
        tableRow: { 
          margin: "auto", 
          flexDirection: "row",
        }, 
        tableCol: { 
            width: "25%", 
        }, 
        tableCol4: { 
            width: "25%",
        },
        tableCellHeader: {
            margin: 3, 
            fontSize: 12,
            textAlign: "center",
            color: "#2D61A4"
        }, 
    
    // Listar Controles y Usuario 
        tableCell: { 
            margin: 4, 
            fontSize: 10,
            textAlign: "center" 
          },
         
    
    // Usuario     
        tableUser: { 
            display: "table", 
            width: "auto", 
            borderStyle: "solid",
            borderColor:"black",
            borderWidth: 1.5,
            borderRadius: 4,
            textAlign: "left",
        }, 
        tableRowUser: { 
            flexDirection: "row",
            margin: "auto",
            textAlign: "left",
        }, 
        tableColHeaderUser: { 
            width: "12%", 
            textAlign: "left",
            marginLeft: 4,
        },   
            tableColUser: { 
            width: "24.5%", 
            textAlign: "left"
        }, 
            tableCellHeaderUser: {
            fontSize: 10,
            textAlign: "left",
            marginTop: 4
        }, 
        tableColUser2: { 
            width: "15%", 
            textAlign: "left"
        }, 
      });