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


export function insertRolApi({name, token}){
    const data = {
        rol: {
            idRol: 0,
            nombre: name
        },
        privilegios: [
            {
                id: 1,
                nombre: "CONSULTAR_ROL"
            },
               {
                id: 3,
                nombre: "ASIGNAR_ROL"
            },
               {
                id: 9,
                nombre: "RETIRAR_ROL"
            },
               {
                id: 4,
                nombre: "LISTAR_ROLES"
            }
        ]
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

export function getRolByIdApi(id){
    const url = `${urlBackend}rol/CONSULTAR_ROL/${id}`;
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

export function updateRolApi(data){
    const url = `${urlBackend}rol/ACTUALIZAR_ROL`;
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

export function deleteRolApi(id){
    const url = `${urlBackend}rol/ELIMINAR_ROL/${id}`;
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

export function getAssignRolApi(idRol, documento, token){
    const doc = parseInt(documento);
    const url = `/api/rol/ASIGNAR_ROL/${parseInt(idRol)}/${doc}`;
    
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
//Preguntar a Danny
export function getRemoveRolApi(id, data){
    const url = `${urlBackend}rol/RETIRAR_ROL/${id}/${data}`;
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