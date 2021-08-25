import { urlBackend } from "./config";

export function getPrivilegiosApi(){
    const url = `${urlBackend}rol/CONSULTAR_PRIVILEGIOS`;
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
