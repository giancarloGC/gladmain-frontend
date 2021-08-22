import { urlBackend } from "./config";

//preguntar los dos metodos a Danny
export function deleteVacApi(id,id2){
    const url = `${urlBackend}control_vacunacion/ELIMINAR_VACUNA_CONTROL/${id}/${id2}`;
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

export function getVacByAgeApi(data){
    const url = `${urlBackend}control_vacunacion/LISTAR_VACUNAS_EDAD`;
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