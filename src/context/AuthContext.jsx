import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
    //Iniciamos el tocken simulado desde el localStore
    const [user, setUser] = useState(() =>{
        const savedUser = localStorage.getItem("libregames_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        // en el futuro se puede validar con token de una API
    },[]);

    function login(username, isAdmin = false){
        // simulacion de token
        const token = `fake-token-${username}-${Date.now()}`;
        const userData = {
            username,
            isAdmin: username === "admin@libregamers.com" || isAdmin
        };
        localStorage.setItem("libregames_token", token);
        localStorage.setItem("libregames_user", JSON.stringify(userData));
        setUser(userData);
    }

    function logout(){
        localStorage.removeItem("libregames_token");
        localStorage.removeItem("libregames_user");
        setUser(null);
    }

    const value = {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

