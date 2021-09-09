import { urlBackend } from "./config";

export function getRolesApi(){
    const url = `/api/sesion/LISTAR_ROLES`;
    const params = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {
                return result;
            })
            .catch(err => {return err});
}


export function insertRolApi({latestRol, name, token, privilegios}){
    var newId = parseInt(latestRol) + 1;
    const data = {
        rol: {
            idRol: newId,
            nombre: name
        },
        privilegios: privilegios
    };

    const url = `/api/rol/REGISTRAR_ROL`;
    const params = {
        headers: {
            "Authorization": token,
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

export function getRolByIdApi(id, token){
    const url = `/api/rol/CONSULTAR_ROL/${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function updateRolApi(data, token){
    const url = `/api/rol/ACTUALIZAR_ROL`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "POST",
        body: JSON.stringify(data)
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function deleteRolApi(id, token){
    const url = `/api/rol/ELIMINAR_ROL/${id}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function getAssignRolApi(idRol, documento, token){
    const newId = parseInt(idRol);
    const doc = parseInt(documento);
    const url = `/api/rol/ASIGNAR_ROL/${newId}/${doc}`;
    
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
            
}

export function getRemoveRolApi(id, data, token){
    const url = `/api/rol/RETIRAR_ROL/${id}/${data}`;
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});
}

export function consultarRolesUsuarioApi(documento, token){
    const url = `/api/rol/CONSULTAR_ROLES_USUARIO/${documento}`;
    
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        method: "GET"
    };

    return fetch(url, params)
            .then(response => {return response.json()})
            .then(result => {return result})
            .catch(err => {return err});  
}
