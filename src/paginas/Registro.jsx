import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pass !== pass2) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log("Registro:",{nombre,email});
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Crear cuenta</h2>

            <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth:480}}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required /> 
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>

                <div className="mb-3">

                    <label className="form-label">Contaseña</label>
                    <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} required/>
                </div>

                <div className="mb-3">

                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" className="form-control" value={pass2} onChange={e => setPass2(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-success w-100">Crear cuenta</button>


            </form>
        </div>
    );
}