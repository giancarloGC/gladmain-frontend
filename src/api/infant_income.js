import { urlBackend } from "./config";


export function insertInfantIncomeApi(data){
    const url = `${urlBackend}control_seguimiento/REGISTRAR_INGRESO_INFANTE`;
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

export function updateInfantIncomeApi(data){
    const url = `${urlBackend}control_seguimiento/ACTUALIZAR_INGRESO_INFANTE`;
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

export function getInfantIncomeApi(data){
    const url = `${urlBackend}control_seguimiento/LISTAR_INGRESOS_INFANTE/${data}`;
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

export function getInfantIncomeXIdApi(id){
    const url = `${urlBackend}control_seguimiento/CONSULTAR_INGRESO_INFANTE${id}`;
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

export function deleteInfantIncomeApi(id){
    const url = `${urlBackend}control_seguimiento/ELIMINAR_INGRESO/${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

