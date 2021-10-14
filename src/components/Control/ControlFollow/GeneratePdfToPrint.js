import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, Font } from '@react-pdf/renderer';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPrint, faEye } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";

import Logo from "../../../assets/img/logocomfaoriente.png";
import GladMaIn from "../../../assets/img/logoGladmain.PNG";
import fuente from "../../../assets/fontPDF/Amaranth-Bold.ttf";
import fuente2 from "../../../assets/fontPDF/Amaranth-Regular.ttf";
import { getUserByIdApi } from "../../../api/user";
import { TOKEN } from "../../../utils/constans";

Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});


export default function GeneratePdfToPrint({item, documento, rolUser}){
  const token = localStorage.getItem(TOKEN);
  const [ infoUser, setInfoUser ] = useState({}); 
  const [ loadedPDF, setLoadedSonPDF ] = useState(false);

    useEffect(() => {
      (async () => {
          const response2 = await getUserByIdApi(documento, token);
          setInfoUser(response2);
          setLoadedSonPDF(true);
      })();       
  }, []);

    useEffect(() => {
      setTimeout(() => {
        setLoadedSonPDF(true);
      }, 2000);
  }, [])
    return(
        <>
        {loadedPDF ? (
        <PDFDownloadLink document={<PDFseguimiento item={item} setLoadedSonPDF={setLoadedSonPDF} infoUser={infoUser} rolUser={rolUser}/>} fileName={`SeguimientoEIngreso${infoUser.documento}`}>
            {/*allControlSaved={allControlSaved} setLoadedSonPDF={setLoadedSonPDF}/>} fileName="controlesCyD.pdf">*/}
        {({ blob, url, loaded, error }) =>
            loaded ? 'Cargando Documento...' : 
            <Button variant="success" type="submit" size="l" ><FontAwesomeIcon icon={faPrint} size="lg" color="white" data-tip data-for = "boton5"
            />  Imprimir</Button>
        }
        </PDFDownloadLink>  
        ):(
          <Button variant="secondary" type="submit" size="l" disabled={true}>
            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true">  </span>
              {"  " + `  Generando PDF...`}  
        </Button>
        )}
        </>
    )
}

function PDFseguimiento(props){
    //const {infoUser, listControls, lastControls, setLoadedSonPDF} = props;
    const { setLoadedSonPDF, item, infoUser, rolUser} = props;
    console.log(item);
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
                    <Text style={{fontSize: 24, color: "#2D61A4", textAlign: "center", fontFamily: 'Amaranth'}}>Control de Seguimiento</Text>
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

            <View style={styles.table3}> 
                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader4}> 
                    <Text style={styles.tableCellHeader}>Documento Acudiente: </Text> 
                </View> 
                <View style={styles.tableCol4}> 
                        <Text style={{fontSize: 13, fontFamily: 'Amaranth2', color:'black'}}>{item.numeroDocAcudiente}</Text> 
                </View> 
                <View style={{width: "5%"}}> 
                        <Text></Text> 
                </View> 
                <View style={styles.tableColHeader4}> 
                    <Text style={styles.tableCellHeader}>Nombre Acudiente: </Text> 
                </View>  
                <View style={{width: "25%"}}> 
                        <Text style={{fontSize: 13, fontFamily: 'Amaranth2', color:'black'}}>{item.nombreAcudiente}</Text> 
                </View> 
                </View>
            </View> 

            {rolUser === 'INFANTE' && ( 
            <View style={styles.table3}> 
                <View style={styles.tableRow}> 
                <View width="100%" style={{textAlign:'center'}}> 
                    <Text style={styles.tableCellHeader}>Progreso Ingreso: <Text style={{fontSize: 14, fontFamily: 'Amaranth2', color:'black'}}>{item.estado} % </Text></Text> 
                </View> 
                </View>
            </View> 
            )}

        {rolUser === 'MADRE_GESTANTE' && ( 
            <View style={styles.table3}> 
                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader4}> 
                    <Text style={styles.tableCellHeader}>Progreso Ingreso: </Text> 
                </View> 
                <View style={styles.tableCol4}> 
                        <Text style={{fontSize: 13, fontFamily: 'Amaranth2', color:'black'}}>{item.estado} %</Text> 
                </View> 
                <View style={{width: "5%"}}> 
                        <Text></Text> 
                </View> 
                <View style={styles.tableColHeader4}> 
                    <Text style={styles.tableCellHeader}>Semanas de Gestación: </Text> 
                </View>  
                <View style={{width: "25%"}}> 
                        <Text style={{fontSize: 13, fontFamily: 'Amaranth2', color:'black'}}>{item.ingreso.ingresoMadre.cantidadSemanas} Semanas </Text> 
                </View> 
                </View>
            </View> 
        )}

            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Fecha Seguimiento:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{dateFormat(item.fecha)}</Text> 
                    </View> 
                </View> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Documento Nutricionista:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.idUsuarioNutricionista}</Text> 
                    </View> 
                </View>
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Cuenta con afiliación al SGSSS:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingreso.afiliacionSgsss}</Text> 
                    </View> 
                </View> 

                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Cuenta con valoración y controles en salud oral:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingreso.saludOral}</Text> 
                    </View> 
                </View> 

                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Conoce la red de salud o a quien acudir en caso de urgencia:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingreso.conoceUrgencias}</Text> 
                    </View> 
                </View> 
                
                {rolUser === 'MADRE_GESTANTE' && ( 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Asiste a controles prenatales:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.controlPrenatal}</Text> 
                    </View> 
                </View> 
                )}

                {rolUser === 'MADRE_GESTANTE' && ( 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Cuenta con suministro de micronutrientes Hierro, Ácido fólico y calcio y los consume:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.cuentaMicro}</Text> 
                    </View> 
                </View> 
                )}

                {rolUser === 'MADRE_GESTANTE' && ( 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Se ha realizado exámenes médicos recomendados para mujeres gestantes:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.examenMedico}</Text> 
                    </View> 
                </View> 
                )}

                {rolUser === 'MADRE_GESTANTE' && ( 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Reconoce las señales de peligro durante el embarazo:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.senalPeligro}</Text> 
                    </View> 
                </View> 
                )}

                {rolUser === 'MADRE_GESTANTE' && ( 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Con su pareja tienen acordado método de planificación para después de que nazca la niña o niño:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.metodoPlanificacion}</Text> 
                    </View> 
                </View> 
                )}

                {rolUser === 'INFANTE' && ( 
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Identifican signos de alarmas de enfermedades prevalentes de la 
                    primera infancia (que ponen en peligro de muerte a niños y niñas):</Text> 
                </View> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell2}>{item.ingreso.ingresoInfante.alarmaPreventiva}</Text> 
                </View> 
                </View>
                )}

                  {rolUser === 'INFANTE' && item.ingreso.ingresoInfante.valoracionMedica !== null && (
                    <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>En niñas y menores de un mes se realizó validación médica:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoInfante.valoracionMedica}</Text> 
                    </View> 
                </View>
                )}

                {rolUser === 'INFANTE' && ( 
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Las niñas y niños cuentan con controles de Crecimiento y Desarrollo:</Text> 
                </View> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell2}>{item.ingreso.ingresoInfante.controlCyD}</Text> 
                </View> 
                </View>
                )}
                
                {rolUser === 'INFANTE' && ( 
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>La niña o niños recibe suplementación (vitamina A, Zinc, Hierro):</Text> 
                </View> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell2}>{item.ingreso.ingresoInfante.recibeSuplementos}</Text> 
                </View> 
                </View>
                )}
                
                {item.ingreso.ingreso.patologiaIdentificadaSgsss === true && (
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Presenta una patología asociada identificada por el SGSSS: </Text> 
                </View> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell2}>Si</Text> 
                </View> 
                </View>
                )}
                {item.ingreso.ingreso.patologiaIdentificadaSgsss === true && (
                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell}>¿Cuál?</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell3}>{item.ingreso.ingreso.nombrePatologia}</Text> 
                </View> 
                </View>
                )}
                

                {item.ingreso.ingreso.recibeMedFormulada === true && (
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Recibe medicamentos formulados por el SGSSS para alguna patología: </Text> 
                </View> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell2}>Si</Text> 
                </View> 
                </View>
                )}

                {item.ingreso.ingreso.recibeMedFormulada === true && (  
                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell}>¿Cuál?</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell3}>{item.ingreso.ingreso.nombreMedFormululada}</Text> 
                </View> 
                </View>
                )}

                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell}>EAPB:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell3}>{item.ingreso.ingreso.eapb}</Text> 
                </View> 
                </View>

                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell}>IPS:</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell3}>{item.ingreso.ingreso.ips}</Text> 
                </View> 
                </View>
                
                {item.ingreso.ingreso.usuarioRemitido === 1 && (
                <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>El usuario fue remitido a SGSSS: </Text> 
                </View> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell2}>{item.ingreso.ingreso.usuarioRemitido}</Text> 
                </View> 
                </View>
                )}

              {item.ingreso.ingreso.usuarioRemitido === 1 && (
                <View style={styles.tableRow}> 
                <View style={styles.tableColHeader2}> 
                    <Text style={styles.tableCell}>¿Por qué?</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell3}>{item.ingreso.ingreso.causa}</Text> 
                </View> 
                </View>
                )}
            </View>   

            {rolUser === 'MADRE_GESTANTE' && ( 
            <View style={styles.table3}> 
                <View style={styles.tableRow}> 
                <View width="100%" style={{textAlign:'center'}}> 
                    <Text style={styles.tableCellHeader}>Señales de peligro en la gestación (AIEPI)</Text> 
                </View> 
                </View>
            </View> 
            )}
            {rolUser === 'MADRE_GESTANTE' && ( 
            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Vómito continuo:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.vomitoControlado}</Text> 
                    </View> 
            </View> 

            <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Dolor de cabeza:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.dolorCabeza}</Text> 
                    </View> 
            </View> 

            <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Fiebre:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.fiebre}</Text> 
                    </View> 
            </View>

            <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Dolor en la boca del estómago:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.dolorBocaEstomago}</Text> 
                    </View> 
            </View>

            <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Ardor al orinar:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.ardorOrinar}</Text> 
                    </View> 
            </View>

            <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Sangrado:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.sangrado}</Text> 
                    </View> 
            </View>

            <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Cara, manos o pies hinchados:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.hinchamiento}</Text> 
                    </View> 
            </View>

            <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Disminución de los movimientos fetales:</Text> 
                    </View> 
                    <View style={styles.tableColHeader2}> 
                        <Text style={styles.tableCell2}>{item.ingreso.ingresoMadre.movimientoFetal}</Text> 
                    </View> 
            </View>
            </View> 
            )}

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
        width: "15%", 
        textAlign: "left",
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
      width: "80%", 
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
    tableCell2: {
      margin: "auto", 
      margin: 5, 
      fontSize: 11,
      fontWeight: 500,
      textAlign: "right",
      color: "#2D61A4", 
    },  
    tableCell3: {
      margin: "auto", 
      margin: 5, 
      fontSize: 11,
      fontWeight: 500,
      textAlign: "right",
      color: "#2D61A4", 
    },
    tableCellHeader: {
      fontSize: 13,
      fontWeight: 500,
      textAlign: "center",
      color: "#2D61A4", 
      fontFamily: 'Amaranth2'
    },  
    tableCell: { 
      margin: "auto", 
      margin: 5, 
      fontSize: 11,
      textAlign: "left"
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