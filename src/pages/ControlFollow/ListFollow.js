import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import ReactTooltip, { TooltipProps } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faPrint, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { getSegApi } from "../../api/follow-up";
import ListFollowUp from "../../components/Control/ControlFollow/ListFollowUp";
import { TOKEN } from "../../utils/constans";
import Lottie from 'react-lottie';
import NotResults from "../../assets/animations/notResults.json";
import { getUserByIdApi } from "../../api/user";
import { getInfantIncomeApi } from "../../api/infant_income";
import moment from 'moment';
import Logo from "../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../assets/img/logoGladmain.PNG";
import fuente from "../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../assets/fontPDF/Amaranth-Regular.ttf";
import useAuth from '../../hooks/useAuth';


import { getMotIncomeByUserApi } from "../../api/mother_income";

export default function ListFollow(){
    const { documento, rolUser } = useParams();
    const token = localStorage.getItem(TOKEN);
    const [ infoUser, setInfoUser ] = useState(null);
    const [ listSeg, setListSeg ] = useState([]);
    const [ listInc, setListInc ] = useState([]);
    const [ listIncome, setListIncome ] = useState([]);
    const [ loadedPDF, setLoadedSonPDF ] = useState(false); 
    const [ loading, setLoading ] = useState(true);  
    const { user } = useAuth();


    /*useEffect(() => {
        getUserByIdApi(documento, token).then(responseUser => {
            setInfoUser(responseUser);
        });
        getSegApi(documento, token).then(response => {
            if(response.length > 0){
                (async () => {
                    let newData = [];
                    let infoCompleted = await calculateProgress(response, newData);                              
                    console.log(response);
                    console.log("siuuuuu");
                    setListSeg(infoCompleted);
                })()
            }
        });
    }, []);*/

    useEffect(() => {
        (async () => {
            const response = await  getSegApi(documento, token);
            setLoading(false);
            if(response.length > 0){
                (async () => {
                    let newData = [];
                    let infoCompleted = await calculateProgress(response, newData);                              
                    console.log(infoCompleted);
                    console.log("siuuuuu");
                    setListSeg(infoCompleted);
                })()
            }

            const responseUser = await getUserByIdApi(documento, token);
            setLoading(false);
            console.log(responseUser);
            setInfoUser(responseUser);
            setLoadedSonPDF(true);

            const responseIncome = await getInfantIncomeApi(documento, token);
            setLoading(false);
            setListIncome(responseIncome);
            setLoadedSonPDF(true);
            


        })();       
        }, []);

        //console.log(listIncome[0].ingreso.nombreMedFormululada);
    const validatePrivilegio = (privilegio) => {
        return user.authorities.filter(priv => priv === privilegio);
    }

    const calculateProgress = async (response, newData) => {
        await Promise.all(response.map(async (item, index) => {
            if(rolUser === "INFANTE"){
                let listIngresos = await getInfantIncomeApi(documento, token);
                console.log(listIngresos);
                let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === item.id);
                console.log(listIngresos);
                let totalOptions = 0;
                if(ingresoBySeg[0].ingresoInfante.valoracionMedica === null){
                    totalOptions = 4;
                }else{
                    totalOptions = 5;
                }

                let optionsSelected = 0;

                if(ingresoBySeg[0].ingreso.afiliacionSgsss === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.saludOral === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.valoracionMedica !== null){
                    if(ingresoBySeg[0].ingresoInfante.valoracionMedica === "SI"){
                        optionsSelected += 1;
                    };
                }
                if(ingresoBySeg[0].ingresoInfante.controlCyD === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.recibeSuplementos === "SI"){
                    optionsSelected += 1;
                };
                /*
                if(ingresoBySeg[0].ingreso.conoceUrgencias === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.alarmaPreventiva === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.patologiaIdentificadaSgsss === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.recibeMedFormulada === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.usuarioRemitido === "1"){
                    optionsSelected += 1;
                };
                */
           
                let percentageCompleted = (optionsSelected / totalOptions) * 100;
                item.estado = percentageCompleted.toString();
                newData.push(item);

            }else if(rolUser === "MADRE_GESTANTE"){
                let listIngresos = await getMotIncomeByUserApi(documento, token);
                console.log(listIngresos);
                let ingresoBySeg = listIngresos.filter(registro => registro.ingreso.idSeguimiento === item.id);
                console.log(ingresoBySeg);
                let totalOptions = 6;
                let optionsSelected = 0;

                if(ingresoBySeg[0].ingreso.afiliacionSgsss === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.saludOral === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.controlPrenatal === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.cuentaMicro === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.examenMedico === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoMadre.metodoPlanificacion === "SI"){
                    optionsSelected += 1;
                };
        
                /*
                if(ingresoBySeg[0].ingreso.conoceUrgencias === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.alarmaPreventiva === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.controlCyD === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.recibeSuplementos === "SI"){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingresoInfante.valoracionMedica === "SI"){
                    optionsSelected += 1;
                };
                 if(ingresoBySeg[0].ingreso.patologiaIdentificadaSgsss === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.recibeMedFormulada === true){
                    optionsSelected += 1;
                };
                if(ingresoBySeg[0].ingreso.usuarioRemitido === "1"){
                    optionsSelected += 1;
                };
                */
                
                let percentageCompleted = (optionsSelected / totalOptions) * 100;
                item.estado = percentageCompleted.toString();
                newData.push(item);
            }
        }));
        console.log("espero padre");
        return newData;
    }

    return(
        <Container>
            <h1 className="text-center mb-4">Seguimientos de {infoUser ? infoUser.nombre : "Anonimo"}
                {validatePrivilegio("REGISTRAR_SEGUIMIENTO").length > 0 && (
                <Link to={`/admin/addControlFollow/${documento}/${rolUser}`}>
                    <FontAwesomeIcon icon={faPlus} style = {{marginLeft:10}} size="l" color="#2D61A4" data-tip data-for = "boton" />
                    <ReactTooltip id="boton" place="bottom" type="dark" effect="float"> Añadir Nuevo Seguimiento </ReactTooltip>
              </Link>
              )}

              {loadedPDF && (
                    <PDFDownloadLink document={<DocumentPdf listSeg={listSeg} listIncome={listIncome} setLoadedSonPDF={setLoadedSonPDF} infoUser={infoUser}/>} fileName={`Ingreso_${infoUser.documento}`}>
                    {({ blob, url, loading, error }) =>
                        loading ? '' : <Button style={styles.boton}>
                        Descargar PDF <FontAwesomeIcon icon={faPrint} size="lg" color="white" />
                    </Button>
                    }
                    </PDFDownloadLink>  
                )}
            </h1>
            {listSeg.length === 0 && (
                <>
                <p style={{"color": "#2D61A4", "fontSize": 27}}>No se encontraron registros</p>
                <Lottie height={400} width={670}
                    options={{ loop: true, autoplay: true, animationData: NotResults, rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}}}  
                />
                </>
            )}
            {listSeg.length > 0 && (
             <ListFollowUp  listSeg={listSeg} documento={documento} listInc={listInc} rolUser={rolUser}/>
            )}
        </Container>
    )
}

Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});

function DocumentPdf({listSeg, listIncome, setLoadedSonPDF, infoUser}){
    useEffect(() => {
        setLoadedSonPDF(true);
    }, [])

    console.log(listSeg);
    console.log(listIncome);
    
    const dateFormat = (date) => {
        if(date){
        let dateFormated = date.split('T');
        return dateFormated[0];
        }
      }
      
    return(
        <Document>
        {/*<Page style={styles.body}>
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
                    <Text style={{fontSize: 24, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Control Ingresos</Text>
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
            
         
         
          
        </Page>*/}
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