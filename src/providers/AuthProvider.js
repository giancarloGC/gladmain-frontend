import React, { useState, useRef, createContext, useEffect } from "react";
import { TOKEN } from "./../utils/constans";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider(props){
    const { children } = props;
    const [ user, setUser ] = useState({ user: null, isLoading: true});
    console.log("en authprovider");
    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function checkUserLogin(setUser){
    const token = localStorage.getItem(TOKEN);
    if(!token){
        console.log("no hay token");
        logout();
        setUser({ user: null, isLoading: false});
    }else{
        console.log("si hay");
        let tokenDecoded = jwt_decode(token);
        console.log(tokenDecoded);
        setUser({ user: tokenDecoded, isLoading: false});
    };
}

function logout(){
    localStorage.removeItem(TOKEN);
}