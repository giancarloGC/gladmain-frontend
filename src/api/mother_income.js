import { urlBackend } from "./config";

export function insertMotIncomeApi(data){
    const url = `${urlBackend}control_seguimiento/REGISTRAR_INGRESO_MADRE`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function updateMotIncomeApi(data){
    const url = `${urlBackend}control_seguimiento/ACTUALIZAR_INGRESO_MADRE`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}


//preguntar a Danny
export function getMotIncomeByUserApi(data){
    const url = `${urlBackend}control_seguimiento/LISTAR_INGRESOS_MADRE`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function getMotIncomeByIdApi(id){
    const url = `${urlBackend}control_seguimiento/CONSULTAR_INGRESO_MADRE/${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}