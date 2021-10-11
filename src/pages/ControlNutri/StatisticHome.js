import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import StatisticNutri from "../../components/Graphics/StatisticNutri";
import StatisticTallaEdad from "../../components/Graphics/StatisticTallaEdad";
import StatisticPesoEdad from "../../components/Graphics/StatisticPesoEdad";
import StatisticImcEdad from "../../components/Graphics/StatisticImcEdad";
import StatisticPesoTalla2a5 from "../../components/Graphics/StatisticPesoTalla2a5";
import StatisticTallaEdad2a5 from "../../components/Graphics/StatisticTallaEdad2a5";
import StatisticPesoEdad2a5 from "../../components/Graphics/StatisticPesoEdad2a5";
import StatisticImcEdad2a5 from "../../components/Graphics/StatisticImcEdad2a5";
import StatisticTallaEdad5a17 from "../../components/Graphics/StatisticTallaEdad5a17";
import StatisticImcEdad5a17 from "../../components/Graphics/StatisticImcEdad5a17";
import StatisticMadreGestante from "../../components/Graphics/StatisticMadreGestante";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getControlNutriApi } from "../../api/controls";
import { getUserByIdApi } from "../../api/user";
import { TOKEN } from "../../utils/constans";
import "./StatisticHome.scss";
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";

export default function StatisticHome(){
    const { edad, sexo, documento, rolUser } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ optionsGraphics, setOptionsGraphics] = useState({ check1: true, check2: false, check3: false, check4: false }); /*check2: edad > 60 ? true : false*/
    const [ listControls, setListControls ] = useState([]);
    const [ infoUser, setInfoUser ] = useState({});
    const [ loadedPDF, setLoadedSonPDF ] = useState(false); 
    const [ loading, setLoading ] = useState(true);  
    const [loaded, setLoaded] = useState(false); 
  
    useEffect(() => {
        (async () => {
            const response = await getControlNutriApi(documento, token);
            setLoading(false);
            console.log(response);
            setListControls(response);

            const response2 = await getUserByIdApi(documento, token);
            setLoading(false);
            console.log(response2);
            setInfoUser(response2);

            setLoadedSonPDF(true);
        })();       
    }, []);

    const handleCheck = (e, item) => {
        if(e.target.checked){
            if(item === "check1"){
                setOptionsGraphics({check1: true, check2: false, check3: false, check4: false });
            } else if(item === "check2"){
                setOptionsGraphics({check1: false, check2: true, check3: false, check4: false });
            } else if(item === "check3"){
                setOptionsGraphics({check1: false, check2: false, check3: true, check4: false });
            } 
            else{
                setOptionsGraphics({check1: false, check2: false, check3: false, check4: true });
            }
        }
    } 

    return(
        <>
        <Row>
        <Col sm="12">
        <h1 className="text-center">Patrones de Crecimiento Infantil de la OMS
            <Link to={`/admin/addControlNutri/${documento}/${rolUser}`} >
                <FontAwesomeIcon icon={faUserPlus} size="lg" color="#2D61A4" style = {{marginLeft:10}} data-tip data-for = "boton1" />
                <ReactTooltip id="boton1" place="bottom" type="dark" effect="float">Agregar Control Nutricional</ReactTooltip>
            </Link>
            
                {loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf listControls={listControls} setLoadedSonPDF={setLoadedSonPDF} infoUser={infoUser}/>} fileName={`ControlNutrición_${infoUser.documento}`}>
                    {({ blob, url, loading, error }) =>
                        loading ? '' : <Button style={styles.boton}>
                        Descargar PDF <FontAwesomeIcon icon={faPrint} size="lg" color="white" />
                    </Button>
                    }
                    </PDFDownloadLink>  
                )}
                
            </h1>
        </Col>
        </Row>

        <Container>
        {listControls.length > 0 ? (
        <>

        <center className="select">
            <Form.Check type="checkbox" inline label="Peso para la Talla" checked={optionsGraphics.check1} onChange={(e) => handleCheck(e, "check1")}/>  
            <Form.Check type="checkbox" inline label="Talla para la Edad" checked={optionsGraphics.check2} onChange={(e) => handleCheck(e, "check2")}/>
            
            {edad >= 60 && edad <=204 || (
                <Form.Check type="checkbox" inline label="Peso para la Edad" checked={optionsGraphics.check3} onChange={(e) => handleCheck(e, "check3")}/>
            )}
            <Form.Check type="checkbox" inline label="IMC para la Edad" checked={optionsGraphics.check4} onChange={(e) => handleCheck(e, "check4")}/>

        </center>
        
        {optionsGraphics.check1 && 
            <>
                {edad < 24 && (
                    <StatisticNutri listControls={listControls} sexo={sexo} token={token} documento={documento} />
                )}
                {edad >= 24 && edad < 60 && (
                    <StatisticPesoTalla2a5 listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
                {edad >= 60 && edad < 204 && (
                    <StatisticPesoTalla2a5 listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
            </>
        
        }
        {optionsGraphics.check2 &&
            <>
                {edad < 24 && (
                    <StatisticTallaEdad listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
                {edad >= 24 && edad < 60 && (
                    <StatisticTallaEdad2a5 listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
                {edad >= 60 && edad < 204 && (
                    <StatisticTallaEdad5a17 listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
            </>
        }
        {optionsGraphics.check3 &&
            <>
                {edad < 24 && (
                    <StatisticPesoEdad  listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
                {edad >= 24 && edad < 60 && (
                    <StatisticPesoEdad2a5 listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
            </>
        }
        {optionsGraphics.check4 &&
            <>
                {edad < 24 && (
                    <StatisticImcEdad listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
                {edad >= 24 && edad < 60 && (
                    <StatisticImcEdad2a5 listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
                {edad >= 60 && edad < 240 && (
                    <StatisticImcEdad5a17 listControls={listControls} sexo={sexo} token={token} documento={documento}/>
                )}
            </>
        }
        
        </>
        )
        :
        (
            <>
            <p style={{"color": "#2D61A4", "font-size": 27}}>No se encontraron registros</p>
            <Lottie height={400} width={670}
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

function DocumentPdf({listControls, setLoadedSonPDF, infoUser}){
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
                    <Text style={{fontSize: 24, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Control Nutricional</Text>
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
              <View style={styles.tableColHeader3}> 
                <Text style={styles.tableCellHeader}>Estado Nutricional</Text> 
              </View>
              <View style={styles.tableColHeader}> 
                <Text style={styles.tableCellHeader}>Nutricionista</Text> 
              </View>
            </View>

            {listControls.map((control, index) => (
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
                    <View style={styles.tableCol5}> 
                        <Text style={styles.tableCell}>{control.estadoNutricional}</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{control.idUsuarioNutricionista}</Text> 
                    </View>
                </View> 
           ))}
        
          </View>
        </Page>
  </Document>
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
    tableColHeader: { 
      width: "20%", 
      textAlign: "center",
    },  
    tableColHeader2: { 
        width: "8%", 
        textAlign: "center",
      },  
    tableColHeader3: { 
        width: "36%", 
        textAlign: "center",
      }, 
    tableCol: { 
      width: "20%", 
      textAlign: "center",
    }, 
    tableCol4: { 
        width: "8%",
        textAlign: "center",
      },
    tableCol5: { 
        width: "36%",
        textAlign: "center",
    },
    tableCellHeader: {
      margin: "auto", 
      margin: 5, 
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





    

