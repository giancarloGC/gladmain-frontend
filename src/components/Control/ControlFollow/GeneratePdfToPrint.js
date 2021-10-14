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

Font.register({ family: 'Amaranth', src: fuente});
Font.register({ family: 'Amaranth2', src: fuente2});


export default function GeneratePdfToPrint({item}){
    const [ loadedPDF, setLoadedSonPDF ] = useState(false); 
    useEffect(() => {
      setTimeout(() => {
        setLoadedSonPDF(true);
      }, 2000);
  }, [])
console.log("entro");
    return(
        <>
        {loadedPDF ? (
        <PDFDownloadLink document={<PDFseguimiento item={item} setLoadedSonPDF={setLoadedSonPDF}/>} fileName="SeguimientoEIngreso.pdf">
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
    const { setLoadedSonPDF, item } = props;
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
                <Text style={styles.tableCellHeaderUser}>Documento del usuario:</Text> 
              </View> 
                    <View style={styles.tableColUser2}> 
                        <Text style={styles.tableCell}>{item.idUsuario}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Documento del nutricionista:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{item.idUsuarioNutricionista}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Fecha del seguimiento:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{dateFormat(item.fecha)}</Text> 
                    </View> 
            </View>
            <View style={styles.tableRowUser}> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Documento del acudiente:</Text> 
              </View> 
                    <View style={styles.tableColUser2}> 
                        <Text style={styles.tableCell}>{item.numeroDocAcudiente}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Nombre acudiente:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{item.nombreAcudiente}</Text> 
                    </View> 
              <View style={styles.tableColHeaderUser}> 
                <Text style={styles.tableCellHeaderUser}>Estado del ingreso:</Text> 
              </View> 
                    <View style={styles.tableColUser}> 
                        <Text style={styles.tableCell}>{item.estado} %</Text> 
                    </View> 
            </View>
            </View>
         
         {/*
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
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{control.idUsuarioNutricionista}</Text> 
                    </View>
                </View> 
            ))}
            
            </View>*/}
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