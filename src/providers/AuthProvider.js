import React, { useState, useRef, createContext, useEffect } from "react";
import { TOKEN } from "./../utils/constans";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider(props){
    const { children } = props;
    const [ user, setUser ] = useState({ user: null, isLoading: true});
    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function checkUserLogin(setUser){
    const token = localStorage.getItem(TOKEN);
    if(!token){
        logout();
        setUser({ user: null, isLoading: false});
    }else{
        let tokenDecoded = jwt_decode(token);
        setUser({ user: tokenDecoded, isLoading: false});
    };
}

function logout(){
    localStorage.removeItem(TOKEN);
}