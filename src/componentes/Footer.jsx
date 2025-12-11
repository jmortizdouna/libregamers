/*import React from "react";

export default function Footer() {
    return(

        <footer className="bg-dark text-light text-center py-3 mt-4">
            <div className="container">
                <p className="mb-1">&copy;{new Date().getFullYear()} LibreGames</p>
                <small>VideoJuegos de software libre. Proyecto final React</small>
            </div>
        </footer>
    );
}*/
import React from "react";
import { FaRegCopyright, FaRegUser, FaRegEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-7">
                        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 mb-3 mb-md-0">
                            <div className="text-center text-md-start">
                                <h6 className="fw-bold mb-1">LibreGames</h6>
                                <small className="text-light-50">
                                    Videojuegos de software libre • Proyecto Final React
                                </small>
                            </div>
                            <div className="vr d-none d-md-block"></div>
                            <div className="text-center text-md-start">
                                <small className="d-flex align-items-center justify-content-center justify-content-md-start mb-1">
                                    <FaRegUser className="me-2 text-info" size={12} />
                                    Desarrollado por: <strong className="ms-1">Juan M. Ortiz Douna</strong>
                                </small>
                                <small className="d-flex align-items-center justify-content-center justify-content-md-start">
                                    <FaRegEnvelope className="me-2 text-info" size={12} />
                                    <a 
                                        href="mailto:jortizdouna@alumnos.exa.unicen.edu.ar" 
                                        className="text-light-50 text-decoration-none"
                                    >
                                        jortizdouna@gmail.com
                                    </a>  
                                     
                                </small>
                                
                        
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-5 text-center text-md-end">
                        <small className="text-muted d-flex align-items-center justify-content-center justify-content-md-end">
                            <FaRegCopyright className="me-1" />
                            {new Date().getFullYear()} • Trabajo Académico • Todos los derechos reservados
                        </small>
                    </div>
                </div>
            </div>
        </footer>
    );
}