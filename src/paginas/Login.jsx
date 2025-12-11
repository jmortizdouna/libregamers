import React, { useState } from "react";
import {Link, useNavigate, useLocation} from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();

    const from = location.state?.from || "/";
    
    const handleSubmit = (e) => {
    
    e.preventDefault();
        if (!email || !password) {
            alert("Completa el mail y contrasenia");
            return;
        }


        //simulamos el login Permitiendo cualquier combianacion de Email y contrseña
        // Solo verificamos si el admin para asignar el rol correcto
        const isAdminUser = email === "admin@libregamers.com"&& password ==="1234";
        login(email, isAdminUser); //guarda el token simulado y el username
        navigate(from,{replace:true});

    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">iniciar sesion</h2>

            <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth: 420}}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>

            <p className="text-center mt-3">¿No tenes cuenta?<Link to="/registro"> Registrate</Link></p>
            <div className="text-center mt-3">
                <small className="text-muted">
                    Demo: Usa cualquier email y contraseña para iniciar sesion.<br />
                    Solo admin@libregamers.com / 1234 tiene permisos de administracion.
                </small>
            </div>
        </div>
    );
}