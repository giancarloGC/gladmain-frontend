import React, { useState, useEffect } from 'react'
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Container, ListGroup, Col, Row, Spinner, Button } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { getRolesApi, deleteRolApi } from "../../api/rol";
import { TOKEN } from "../../utils/constans";
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";

Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});

function DocumentPdf({rolesApi, setLoadedSonPDF}){
    useEffect(() => {
        setLoadedSonPDF(true);
    }, [])

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
                    <Text style={{fontSize: 24, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Listado de roles</Text>
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

       {/*{rolesApi.map((rol, index) => (*/}
            <View style={styles.tableUser}> 
            <View style={styles.tableRowUser}> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Documento:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>hgfhfhf</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Usuario:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>dfgdg</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Fecha Nacimiento:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>fgfdgfg</Text> 
                    </View> 
            </View>
            <View style={styles.tableRowUser}> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Telefono:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>dfgfdg</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Municipio:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>dgdfgfg</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Dirección:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>gdfgfgd</Text> 
                    </View> 
            </View>
            </View>
            {/*))}*/}
         
          <View style={styles.table}> 
            <View style={styles.tableRow}> 
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Código</Text> 
              </View> 
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Titulo</Text> 
              </View>  
            </View>

            {rolesApi.map((rol, index) => (
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{rol.idRol}</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{rol.nombre}</Text> 
                    </View> 
                </View> 
            ))}
        
          </View>
        </Page>
  </Document>
    )
}

export default function ListRol(){
    const token = localStorage.getItem(TOKEN);
    const [ rolesApi, setRolesApi ] = useState([]);
    const [ latestRol, setLatestRol ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ loadedPDF, setLoadedSonPDF ] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await getRolesApi();
            setLoading(false);
            setRolesApi(response);
            let rolesDesc = response.sort(function (a, b){
                return (b.idRol - a.idRol)
            });
            setLatestRol(rolesDesc[0].idRol);
            setLoadedSonPDF(true);
        })();       
    }, []);


    const confirmDeleteRol = (idRol) => {
        swal({
            title: "¿Estás seguro de eliminar el rol?",
            text: "¡Una vez eliminado no se podrá recuperar!",
            icon: "warning",
            buttons: ['Cancelar', 'Sí, eliminar'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteRol(idRol);
            }
          });
    }

    const deleteRol = (idRol) => {
        deleteRolApi(idRol, token).then(response => {
            if(response === true){
                swal("Excelente! Rol eliminado!", {
                    icon: "success",
                })
                .then((value) => {
                    window.location.replace("/admin/roles");
                  });                      
            }else{
                swal("Opss! Ocurrió un error al eliminar el rol!", {
                    icon: "error",
                })
                .then((value) => {
                    window.location.replace("/admin/roles");
                  });                  
            }
        })
    }

    return(
        <Container className="justify-content-center">
            <h1 className="text-center">Listado de roles <FontAwesomeIcon icon={faPlus} size="lg" color="#2D61A4"
                    data-tip data-for = "boton1" onClick={() => window.location.replace(`/admin/addRol/${latestRol}`)}
                /> {` `}
                <ReactTooltip id="boton1" place="bottom" type="dark" effect="float"> Agregar Nuevo Rol </ReactTooltip>
                
                {loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf rolesApi={rolesApi} setLoadedSonPDF={setLoadedSonPDF}/>} fileName="somename.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : <Button>
                        Descargar PDF <FontAwesomeIcon icon={faPrint} size="lg" color="white" />
                    </Button>
                    }
                    </PDFDownloadLink>  
                )} 
            </h1> 
   

            {loading && (
                <Row className="justify-content-md-center text-center">
                    <Col md={1} className="justify-content-center">
                    <Spinner animation="border" >
                    </Spinner> 
                    </Col>
                </Row>
            )}

            {rolesApi.length > 0 && (
                <ListRolSon rolesApi={rolesApi} confirmDeleteRol={confirmDeleteRol} />
            )}
        </Container>
    )
}

function ListRolSon({rolesApi, confirmDeleteRol}){
    return(
        <Container>
        <ListGroup>
            {rolesApi.map((rol, index) => (
            <ListGroup.Item className="shadow border mt-2 mb-3">
            <Container>
            <Row>
                <Col md={4} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Código </b> <br/> {rol.idRol}</p>
                </Col>
                <Col md={4} className="align-self-center">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Titulo </b> <br/> {rol.nombre}</p>
                </Col>
                <Col md={4} className="align-self-center justify-content-around">
                    <p style={{"color": "#2D61A4", "fontSize": 23}}><b>Acciones </b> <br/>
                        <Link to={`/admin/editRol/${rol.idRol}`} className="btn btn-primary">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton2">
                                <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>
                            <ReactTooltip id="boton2" place="bottom" type="dark" effect="float"> Editar </ReactTooltip>
                        </Link>
                        <Link className="btn btn-secondary text-center mx-3" onClick={() => confirmDeleteRol(rol.idRol)}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-tip data-for = "boton3">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                            </svg>
                            <ReactTooltip id="boton3" place="bottom" type="dark" effect="float"> Eliminar </ReactTooltip>
                        </Link>    
                    </p>               
                </Col>
            </Row>
            </Container>
        </ListGroup.Item>
            ))}
        </ListGroup>
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
      marginTop: 10
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    table2: { 
        display: "table", 
        width: "auto", 
      }, 
      tableRow2: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol2: { 
        width: "25%"
      }, 
      tableCol3: { 
        width: "50%",
        marginTop: 20
      },
    tableColHeader: { 
      width: "25%", 
    },   
    tableCol: { 
      width: "25%", 
    }, 
    tableCellHeader: {
      margin: "auto", 
      margin: 5, 
      fontSize: 10,
      fontWeight: 500
    },  
    tableCell: { 
      margin: "auto", 
      margin: 5, 
      fontSize: 10 
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
        textAlign: "left"
    }, 
    tableRowUser: { 
        flexDirection: "row",
        textAlign: "left",
        margin: "auto"
    }, 
    tableColHeaderUser: { 
        width: "12%", 
        textAlign: "left",
        marginLeft: 4,
    },   
        tableColUser: { 
        width: "21.3%", 
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
  });