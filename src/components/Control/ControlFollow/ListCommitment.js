import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {Row, Form} from "react-bootstrap";
import ListCommitIncome from "../ControlFollow/ListCommitments/ListCommitIncome";
import ListOtherCommit from "../ControlFollow/ListCommitments/ListOtherCommit";

export default function ListCommitment(){

    const [ optionsCommits, setOptionsCommits] = useState({ check1: true, check2: false});

    const handleCheck = (e, item) => {
        console.log(e);
        console.log(item);
        if(e.target.checked){
            if(item === "check1"){
            setOptionsCommits({check1: true, check2: false});
            } else {
            setOptionsCommits({check1: false, check2: true});
        }
    }
}

    return(
        <Container>
             <h1 className="text-center">Lista Compromisos </h1>
             <Form.Group as={Row} className="mb-1">
                <div class="middle">
                  <label>
                  {//<Form.Check type="radio" name="radio"/>
                  }
                  <input type="radio" name="radio" checked={optionsCommits.check1} onChange={(e) => handleCheck(e, "check1")}/>
                  <div class="front-end box">
                    <span>Compromiso por factores de riesgo en ingreso</span>
                  </div>
                  </label>

                  <label>
                  {//<Form.Check type="radio" name="radio"/>
                  }
                  <input type="radio" name="radio" checked={optionsCommits.check2} onChange={(e) => handleCheck(e, "check2")}/>
                  <div class="back-end box">
                    <span>Otros Compromisos</span>
                  </div>
                  </label>
                </div>
                </Form.Group>
            
            {optionsCommits.check1 &&
                <ListCommitIncome />
            }
            {optionsCommits.check2 &&
                <ListOtherCommit />
            }
            
        </Container>
    )
}