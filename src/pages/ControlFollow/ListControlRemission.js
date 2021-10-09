import React, { useEffect, useState } from "react";
import { Container, ListGroup, Col, Row, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import ListControlR from "../../components/Control/ControlFollow/ListControlR";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { useParams } from "react-router-dom";
import { getRemisByUserApi } from "../../api/remission";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";

Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});

function DocumentPdf({infoUser, listRemis, setLoadedSonPDF}){
    
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
                    <Text style={{fontSize: 24, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Listado de Remisiones</Text>
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
                        <Text style={styles.tableCell}>{infoUser.documento}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Usuario:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{infoUser.nombre}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Fecha Nacimiento:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{dateFormat(infoUser.fechaNacimiento)}</Text> 
                    </View> 
            </View>
            <View style={styles.tableRowUser}> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Telefono:</Text> 
              </View> 
                    <View style={styles.tableColUser2}> 
                        <Text style={styles.tableCell}>{infoUser.celular}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Municipio:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{infoUser.municipio}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Dirección:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{infoUser.direccion}</Text> 
                    </View> 
            </View>
            </View>
         
        {listRemis.map((item, index) => (
           <View style={styles.table3}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Fecha Remisión:</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}>{dateFormat(item.fechaRemision)}</Text> 
                    </View> 
                </View> 
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Entidad Remitida:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {item.entidadRemitida}</Text> 
                    </View> 
                </View>

                {item.atendido === true ? (
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>¿Atendido?:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                      <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> Si </Text> 
                    </View> 
                </View>
                ):(
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>¿Atendido?:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                      <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> No </Text> 
                    </View> 
                </View>
                )
                }

                {item.fechaAtencion !== null && 
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Fecha Atención:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {dateFormat(item.fechaAtencion)}</Text> 
                    </View> 
                </View> 
                }

                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Motivo Remisión:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {item.motivo}</Text> 
                    </View> 
                </View>

                {item.hospitalizado === true ? (
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>¿Hospitalizado?: </Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> Si </Text> 
                    </View> 
                </View>
                ):(
                    <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>¿Hospitalizado?: </Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> No </Text> 
                    </View> 
                </View>
                )}

                {item.fechaIngreso !== null && 
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Fecha Ingreso:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {dateFormat(item.fechaIngreso)}</Text> 
                    </View> 
                </View>
                }

                {item.fechaSalida !== null && 
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Fecha Salida:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {dateFormat(item.fechaSalida)}</Text> 
                    </View> 
                </View>
                }

                {item.fallecido === true ? ( 
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>¿Fallecio?:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}>Si</Text> 
                    </View> 
                </View>
                ):(
                  <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>¿Fallecio?:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}>No</Text> 
                    </View> 
                </View>
                )}

                {item.razonFallecimiento !== null && 
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Razon Fallecimiento:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {item.razonFallecimiento}</Text> 
                    </View> 
                </View>
                }
                
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Seguimiento:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {item.seguimiento}</Text> 
                    </View> 
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader4}> 
                        <Text style={styles.tableCellHeader}>Enfermero:</Text> 
                    </View>  
                    <View style={styles.tableCol4}> 
                            <Text style={{fontSize: 10, fontFamily: 'Amaranth2', color:'black'}}> {item.nombreAuxEnfermero}</Text> 
                    </View> 
                </View>
            </View> 
            ))}
        </Page>
  </Document>
    )
}

export default function ListControlRemission(){
  const { idSeg, documento } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [ infoUser, setInfoUser ] = useState(null);
  const [ listRemis, setListRemis ] = useState([]);
  const [ allRemisionsSaved, setAllRemisions ] = useState([]);
  const [loaded, setLoaded] = useState(true); 
  const [ loadedPDF, setLoadedSonPDF ] = useState(false);

  useEffect(() => {
    (async () => {
        const response2 = await getUserByIdApi(documento, token);
        setLoaded(false);
        setInfoUser(response2);

        const response3 = await getRemisByUserApi(documento, token);
        let remisionesBySeg = response3.filter(remission => remission.idSeguimiento === parseInt(idSeg));
        setLoaded(false);
        setListRemis(remisionesBySeg);
        
        setAllRemisions(remisionesBySeg);
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
              {loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf infoUser={infoUser} listRemis={listRemis} allRemisionsSaved={allRemisionsSaved}
                        setListRemis={setListRemis} idSeg={idSeg} documento={documento} setLoadedSonPDF={setLoadedSonPDF}/>} fileName="Remisiones.pdf">
                    {({ blob, url, loaded, error }) =>
                        loaded ? 'Cargando Documento...' : <Button style={styles.boton}>
                        Descargar PDF <FontAwesomeIcon icon={faPrint} style = {{marginLeft:2}} size="lg" color="white" />
                    </Button>
                    }
                    </PDFDownloadLink>  
                )}
            </h1>

            {loaded && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )}
            
            <Container className="mt-4"> 
            <Row className="mb-2 mt-3">
                    <Col md={3}> </Col>
                    <Col md={6}>
                    <Form.Group as={Row} className="mt-2 " style={{ "marginLeft":"6px"}}>
                        <Form.Label>
                        <h1 style={{fontSize: "20px", color:"#0084d2" }} className="mt-2">Buscar Remisiones</h1></Form.Label>
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

            {listRemis.length > 0 && (
             <ListControlR listRemis={listRemis} allRemisionsSaved={allRemisionsSaved}
             setListRemis={setListRemis} idSeg={idSeg} documento={documento}
            />
            )}

            {listRemis.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
                 
        </Container>
    )
}

const styles = StyleSheet.create({
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
    table: { 
      display: "table", 
      width: "auto", 
      marginTop: 10,
      textAlign: "center",
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row",
      textAlign: "center",
    }, 
    table2: { 
        display: "table", 
        width: "auto",
        textAlign: "left", 
      }, 
    table3: { 
        display: "table", 
        width: "auto", 
        marginTop: 10,
        backgroundColor: "#DFE1E2",
        borderRadius: 5
      },
      tableRow2: { 
        margin: "auto", 
        flexDirection: "row",
        textAlign: "left",
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
    tableColHeader: { 
      width: "35%", 
      textAlign: "center",
    },  
    tableColHeader2: { 
        width: "10%", 
        textAlign: "center",
      },  
    tableColHeader3: { 
        width: "35%", 
        textAlign: "center",
      }, 
      tableColHeader4: { 
        width: "20%", 
        textAlign: "left",
        marginLeft: 2,
      },
    tableCol: { 
      width: "35%", 
      textAlign: "left",
    }, 
    tableCol4: { 
        width: "80%",
        textAlign: "left",
      },
    tableCol5: { 
        width: "35%",
        textAlign: "center",
    },
    tableCellHeader: {
      fontSize: 10,
      fontWeight: 500,
      textAlign: "left",
      color: "#2D61A4", 
      fontFamily: 'Amaranth2'
    },  
    tableCell: { 
      margin: "auto", 
      margin: 5, 
      fontSize: 10,
      textAlign: "center" 
    }, 
    tableRow: {
        flexDirection: "row" 
      }, 
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
        tableCellUser: { 
        fontSize: 10,
        textAlign: "left"
    },
    tableColUser2: { 
        width: "15%", 
        textAlign: "left"
    }, 
  });