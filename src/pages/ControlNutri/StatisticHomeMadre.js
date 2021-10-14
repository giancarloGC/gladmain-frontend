import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col, Button, Form, InputGroup, Alert, Spinner} from "react-bootstrap";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useParams, Link } from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import StatisticMadreGestante from "../../components/Graphics/StatisticMadreGestante";
import { getUserByIdApi } from "../../api/user";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getControlNutriApi } from "../../api/controls";
import { TOKEN } from "../../utils/constans";
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";
import "./StatisticHome.scss";
import useAuth from '../../hooks/useAuth'; //privilegios

export default function StatisticHomeMadre(){
    const { documento, rolUser } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [userControl, setUser] = useState({});
    const [ listControls, setListControls ] = useState([]);
    const [loaded, setLoaded] = useState(true); 
    const [ loadedPDF, setLoadedSonPDF ] = useState(false);
    const { user } = useAuth(); //privilegios

    useEffect(() => {
        (async () => {
            const response = await getUserByIdApi(documento, token);
            setLoaded(false);
            setUser(response);
    
            const response2 = await getControlNutriApi(documento, token);
            setLoaded(false);
            setListControls(response2);
            
            setLoadedSonPDF(true);
        })();       
    }, []);

    //privilegios
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    return(
        <>
            <Container>
            <h1 className="text-center">IMC para la Edad Gestacional
            {validatePrivilegio("REGISTRAR_CONTROL").length > 0 && ("CONSULTAR_USUARIO").length > 0 && (
                <Link to={`/admin/AddControlNutriMadre/${documento}/${rolUser}`} >
                    <FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4" style = {{marginLeft:10}} data-tip data-for = "boton1" />
                    <ReactTooltip id="boton1" place="bottom" type="dark" effect="float">Agregar Control Nutricional</ReactTooltip>
                </Link>
            )}
            {loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf userControl={userControl} listControls={listControls} setLoadedSonPDF={setLoadedSonPDF}/>} fileName="ControlNutricionalMadre.pdf">
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

        {listControls.length > 0 ? (
        <>
          <StatisticMadreGestante listControls={listControls} token={token} documento={documento}/>
        </>
        )
        :
        (
            <>
            <p style={{"color": "#2D61A4", "font-size": 27}}>No se encontraron registros</p>
            <Lottie height={400} width="60%"
                options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
            />
            </>
        )
        }
    </Container>
    </>
        
    )
}

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
                    <Text style={{fontSize: 20, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Controles Nutricionales</Text>
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
                        <Text style={styles.tableCellHeader}>Fecha Aplicación</Text> 
                    </View> 
                    <View style={styles.tableCol5}> 
                        <Text style={styles.tableCellHeader}>Peso</Text> 
                    </View> 
                    <View style={styles.tableCol5}> 
                        <Text style={styles.tableCellHeader}>Talla</Text> 
                    </View> 
                    <View style={styles.tableCol5}> 
                        <Text style={styles.tableCellHeader}>IMC</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Estado Nutricional</Text> 
                    </View> 
                    <View style={styles.tableCol6}> 
                        <Text style={styles.tableCellHeader}>Tensión</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCellHeader}>Edad Gestacional</Text> 
                    </View> 
                </View> 
            </View>
         
        {listControls.map((item, index) => (
            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{dateFormat (item.fechaControl)}</Text> 
                    </View> 
                    <View style={styles.tableCol5}> 
                        <Text style={styles.tableCell}>{item.peso} kg</Text> 
                    </View> 
                    <View style={styles.tableCol5}> 
                        <Text style={styles.tableCell}>{item.talla} cm</Text> 
                    </View> 
                    <View style={styles.tableCol5}> 
                        <Text style={styles.tableCell}>{item.imc}</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{item.estadoNutricional}</Text> 
                    </View> 
                    <View style={styles.tableCol6}> 
                        <Text style={styles.tableCell}>{item.tension}</Text> 
                    </View> 
                    <View style={styles.tableCol4}> 
                        <Text style={styles.tableCell}>{item.edadGestacional} semanas</Text> 
                    </View> 
                </View> 
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
            marginLeft: 7,
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
            width: "22%",
        }, 
        tableCol4: { 
            width: "22%",
        },
        tableCol5: { 
            width: "8%",
        },
        tableCol6: { 
            width: "10%",
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