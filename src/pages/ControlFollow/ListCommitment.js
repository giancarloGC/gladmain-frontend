import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import swal from 'sweetalert';
import { faPlus, faPrint, faFileMedicalAlt } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { useParams } from "react-router-dom";
import { getCompByUserApi, deleteCompApi } from "../../api/commitment";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";
import AnimationNotFindSearch from "../../assets/animations/notFindSearch.json";

export default function ListCommitment(){

  const { idSeg, documento } = useParams();
  const token = localStorage.getItem(TOKEN);
  const [ listControls, setListControls ] = useState([]);
  const [ infoUser, setInfoUser ] = useState({});
  const [ loadedPDF, setLoadedSonPDF ] = useState(false); 
  const [ loading, setLoading ] = useState(true);  
  const [ listCommit, setListComit ] = useState([]);
  
  /*useEffect(() => {
      getUserByIdApi(documento, token).then(responseUser => {
          setInfoUser(responseUser);
      });
      getCompByUserApi(documento, token).then(response => {
          console.log(response);
          if(response.length > 0){
              console.log(idSeg);
              let compromisosBySegui = response.filter(comp => comp.idSeguimientoSalud.toString() === idSeg );
            console.log(compromisosBySegui);
              setListControls(compromisosBySegui);
          }
        });
  }, []);*/

  useEffect(() => {
    (async () => {
        const response = await getCompByUserApi(documento, token);
        setLoading(false);
        if(response.length > 0){
            let compromisosBySegui = response.filter(comp => comp.idSeguimientoSalud.toString() === idSeg );
            setListControls(compromisosBySegui);
            setListComit(compromisosBySegui);
        }
        const responseUser = await getUserByIdApi(documento, token);
        console.log(responseUser);
        setLoading(false);
        setInfoUser(responseUser);
        setLoadedSonPDF(true);
    })();       
    }, []);

  const dateFormat = (date) => {
    if(date){
    let dateFormated = date.split('T');
    return dateFormated[0];
    }
  }

  const confirmDeleteCom = (id) => {
    swal({
        title: "¿Estás seguro de eliminar el Compromiso?",
        text: "¡Una vez eliminado no se podrá recuperar!",
        icon: "warning",
        buttons: ['Cancelar', 'Sí, eliminar'],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            deleteCom(id);
        }
      });
}

const deleteCom = (id) => {
    deleteCompApi(id, token).then(response => {
        if(response === true){
            swal("Excelente! Compromiso eliminado!", {
                icon: "success",
            })
            .then((value) => {
                window.location.replace(`/admin/commitments/${idSeg}/${documento}`);
              });                      
        }else{
            swal("Opss! Ocurrió un error al eliminar el Compromiso!", {
                icon: "error",
            })
            .then((value) => {
                window.location.replace(`/admin/commitments}/${idSeg}/${documento}`);
              });                  
        }
    })
}

const onChangeBusqueda = (e) => {
    var commitFiltred = listCommit.filter(user => dateFormat(user.fechaCompromiso) === e.target.value);
    setListControls(commitFiltred);
}

    return(
        <Container>
            <h1 className="text-center mb-4">Compromisos de {infoUser ? infoUser.nombre : "Anonimo"}
              <Link to={`/admin/addCommitment/${idSeg}/${documento}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Compromiso </ReactTooltip>
              </Link>

                {loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf listControls={listControls} setLoadedSonPDF={setLoadedSonPDF} infoUser={infoUser}/>} fileName={`ControlCompromisos_${infoUser.documento}`}>
                    {({ blob, url, loading, error }) =>
                        loading ? '' : <Button style={styles.boton}>
                        Descargar PDF <FontAwesomeIcon icon={faPrint} size="lg" color="white" />
                    </Button>
                    }
                    </PDFDownloadLink>  
                )}

            </h1>

            <Container className="mt-4"> 
            <Row className="mt-3 justify-content-center">
                    <Col md={6}>
                    <Form.Group as={Row} >
                    <Col md={5}>
                        <Form.Label>
                        <h1 style={{fontSize: "20px", color:"#2D61A4" }} >Buscar Compromisos</h1></Form.Label>
                    </Col>
                    <Col md={7}> 
                    <InputGroup hasValidation>
                           <Form.Control type="date" size="l" id="busqueda" name="busqueda" 
                                onChange={(e) => onChangeBusqueda(e)}
                           />
                       </InputGroup>
                    </Col>
                       </Form.Group>                    
                    </Col>
            </Row>
            </Container>

            
            {listControls.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width="60%"
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}

                
            <Container> 
            <Row>
            {listCommit.length > 0 && (
             <Col sm={12} >
                {listControls.length === 0 && (
                <>
                    <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros que coincidan</p>
                    <Lottie hheight={500} width="80%"
                        options={{ loop: true, autoplay: true, animationData: AnimationNotFindSearch, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                    />
                </>
                )}


            {listControls.length > 0 && (
              <ListGroup className="mt-3 mb-3">
                {listControls.map((item, index) => (
                    <ListGroup.Item className="shadow border mt-2 mb-3">

                   <Container>
                   <Row >
                       <Col sm={3} className="align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Inicio</b> <br/>{dateFormat(item.fechaCompromiso)}</p>
                       </Col>
                       <Col sm={3} className="align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Nombre </b> <br/>{item.nombre}</p>
                       </Col>
                       <Col sm={3} className="align-self-center">
                           <p style={{"color": "#2D61A4", "fontSize": 19.2}}><b>Fin</b> <br/>{dateFormat(item.fechaCumplimiento)}</p>
                       </Col>
                       <Col sm={3} className="align-self-right">
                            <p style={{"color": "#2D61A4", "fontSize": 20}}><b>Acciones</b> <br/>
                                <Link to={`/admin/detailCommitment/${idSeg}/${item.id}`} className="btn btn-primary">
                                <FontAwesomeIcon icon={faEye} size="l" data-tip data-for = "boton3" 
                                /> <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Ver </ReactTooltip>
                                </Link>
                                <Link to={`/admin/editCommitment/${idSeg}/${item.id}/${documento}`} className="btn btn-warning mx-1">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton4">
                                        <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                    </svg>
                                    <ReactTooltip id="boton4" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                                </Link>
                                <Link className="enlace btn btn-primary" onClick={() => confirmDeleteCom(item.id)}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton5">
                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                                <ReactTooltip id="boton5" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                                </Link> 
                                <Link className="btn btn-secondary text-center mx-1">
                                   <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-print-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton6">
                                   <FontAwesomeIcon icon={faPrint}
                                   />
                               </svg>
                               <ReactTooltip id="boton6" place="bottom" type="dark" effect="float"> Imprimir </ReactTooltip>
                               </Link > 
                            </p>                     
                        </Col>
                    </Row>
                </Container>
                </ListGroup.Item>
                ))}
                </ListGroup> 
                )}
                </Col>
               
                )}
                </Row>     
            </Container>
            </Container> 
    )
}



Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});

function DocumentPdf({listControls, setLoadedSonPDF, infoUser}){
    useEffect(() => {
        setLoadedSonPDF(true);
    }, [])

    console.log(listControls);
    
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
                    <Text style={{fontSize: 24, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Control Compromisos</Text>
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
                        <Text style={styles.tableCell}>{dateFormat (infoUser.fechaNacimiento)}</Text> 
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
            
         
            {listControls.map((control, index) => (
            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Fecha Compromiso:</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{dateFormat (control.fechaCompromiso)}</Text> 
                    </View> 
                </View> 

                {control.tipo !== null &&
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Tipo Compromisos:</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{control.tipo}</Text> 
                    </View> 
                </View> 
                }

                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Nombre:</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{control.nombre}</Text> 
                    </View> 
                </View> 

                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Descripción:</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{control.nuevoCompromiso}</Text> 
                    </View> 
                </View> 

                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Aux. Enfermera:</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{control.nombreAuxiliarEnfermeria}</Text> 
                    </View> 
                </View> 

                {control.fechaCumplimiento === null ? (
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCellHeader}>Fecha Cumplimiento:</Text> 
                </View> 
                <View style={styles.tableCol4}> 
                    <Text style={styles.tableCell}>Ninguna</Text> 
                </View> 
                </View>
                ):(
                    <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Fecha Cumplimiento:</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{dateFormat (control.fechaCumplimiento)}</Text> 
                    </View> 
                </View>
                )}

            </View>   
           ))}
        
          
        </Page>
  </Document>
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
        width: "75%",
    },
    tableCellHeader: {
        margin: 3, 
        fontSize: 12,
        textAlign: "left",
        color: "#2D61A4"
    }, 

// Listar Controles y Usuario 
    tableCell: { 
        margin: 4, 
        fontSize: 10,
        textAlign: "left" 
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