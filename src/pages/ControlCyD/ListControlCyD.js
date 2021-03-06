import React, { useEffect, useState } from "react";
import { Container, ListGroup, Col, Row, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import ListControlCyDe from "../../components/Control/ControlCyD/ListControlCyDe";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { TOKEN } from "../../utils/constans";
import { getUserByIdApi } from "../../api/user";
import { getControlCyDApi, getLatestCyDApi } from "../../api/controls";
import { useParams } from "react-router-dom";
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";
import useAuth from '../../hooks/useAuth'; //privilegios
import AnimationAuthorization from "../../assets/animations/withoutAuthorization.json";

Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});

function DocumentPdf({infoUser, listControls, lastControls, setLoadedSonPDF}){
    
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
                    <Text style={{fontSize: 24, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Controles Crecimiento y Desarrollo</Text>
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
                <Text style={styles.tableCellHeaderUser}>Direcci??n:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{infoUser.direccion}</Text> 
                    </View> 
            </View>
            </View>
         
         
           <View style={styles.table3}> 
                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader4}> 
                    <Text style={styles.tableCellHeader}>Fecha Ultimo Control:</Text> 
                </View> 
                <View style={styles.tableCol4}> 
                        <Text style={{fontSize: 14, fontFamily: 'Amaranth2', color:'black'}}>{dateFormat(lastControls.ultimoControl)}</Text> 
                </View> 
                <View style={{width: "15%"}}> 
                        <Text></Text> 
                </View> 
                <View style={styles.tableColHeader4}> 
                    <Text style={styles.tableCellHeader}>Proximo Control:</Text> 
                </View>  
                <View style={styles.tableCol4}> 
                        <Text style={{fontSize: 14, fontFamily: 'Amaranth2', color:'black'}}> {dateFormat(lastControls.proximoControl)}</Text> 
                </View> 
                </View>
            
            </View> 

            <View style={styles.table}> 
            <View style={styles.tableRow}> 
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Fecha Control</Text> 
              </View> 
              <View style={styles.tableColHeader2}> 
                <Text style={styles.tableCellHeader}>Peso</Text> 
              </View>  
              <View style={styles.tableColHeader2}> 
                <Text style={styles.tableCellHeader}>Talla</Text> 
              </View>
              <View style={styles.tableColHeader2}> 
                <Text style={styles.tableCellHeader}>IMC</Text> 
              </View>
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Nutricionista</Text> 
              </View>
            </View>

            {listControls.length > 0 && (
            listControls.map((control, index) => (
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{dateFormat (control.fechaControl)}</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{control.peso}</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{control.talla}</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{control.imc}</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{control.idUsuarioNutricionista}</Text> 
                    </View>
                </View> 
           ))
          )}
        
          </View>
        </Page>
  </Document>
    )
}

export default function ListControlCyD(){
    const { documento } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState({});
    const [ listControls, setListControls ] = useState([]);
    const [ lastControls, setLastControls ] = useState({});
    const [ allControlSaved, setAllControl ] = useState([]);
    const [loaded, setLoaded] = useState(true); 
    const [ loadedPDF, setLoadedSonPDF ] = useState(false);
    const { user } = useAuth(); //privilegios
    const [ authorization, setAuthorization ] = useState(true);
    const [fontLoaded, setFontLoaded] = useState(false);

    const validatePrivilegio = (privilegio) => {
      return user.authorities.filter(priv => priv === privilegio);
    }

    useEffect(() => {
        (async () => {
          const response = await getLatestCyDApi(documento, token);
            setLoaded(false);
            setLastControls(response);

            const response2 = await getUserByIdApi(documento, token);
            setLoaded(false);
            setInfoUser(response2);
            const response3 = await getControlCyDApi(documento, token);
            setLoaded(false);
            setListControls(response3);
            setAllControl(response3);
            setLoadedSonPDF(true);
            setTimeout(() => {
              setFontLoaded(true);
          }, 3000);
        })();  
    }, []);

    const dateFormat = (date) => {
      if(date){
      let dateFormated = date.split('T');
      return dateFormated[0];
      }
    };

    const onChangeBusqueda = (e) => {
      var controlFiltred = allControlSaved.filter(user => dateFormat(user.fechaControl) === e.target.value);
      setListControls(controlFiltred);
  }

  if(validatePrivilegio("LISTAR_CONTROLES_CYD").length === 0){
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
            <h1 className="text-center">Controles de Crec. y Des. de {infoUser ? infoUser.nombre : "Anonimo"}
            {validatePrivilegio("REGISTRAR_CONTROL").length > 0 && ("ACTUALIZAR_USUARIO").length > 0 && ("CONSULTAR_USUARIO").length > 0 &&(
                <Link to={`/admin/addControlCyD/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="lg" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> A??adir Nuevo Control </ReactTooltip>
                </Link>
            )}
                {fontLoaded && loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf infoUser={infoUser} listControls={listControls} lastControls={lastControls} 
                        allControlSaved={allControlSaved} setLoadedSonPDF={setLoadedSonPDF}/>} fileName="controlesCyD.pdf">
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

              
             {listControls.length > 0 &&  (
                <ListControlCyDe infoUser={infoUser} user={user} lastControls={lastControls} listControls={listControls} allControlSaved={allControlSaved}  setAllControl={setAllControl}/>
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
        textAlign: "center", 
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
        width: "30%", 
        textAlign: "center",
      },
    tableCol: { 
      width: "35%", 
      textAlign: "center",
    }, 
    tableCol4: { 
        width: "10%",
        textAlign: "center",
      },
    tableCol5: { 
        width: "35%",
        textAlign: "center",
    },
    tableCellHeader: {
      fontSize: 14,
      fontWeight: 500,
      textAlign: "center",
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