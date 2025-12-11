import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaUser, FaGamepad } from "react-icons/fa";

export default function Navbar() {
    const { totalCount } = useCart();
    const { isAuthenticated, user, logout, isAdmin } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <FaGamepad className="me-2" /> LibreGamers
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalogo">Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sobre">Sobre Nosotros</Link>
                        </li>
                    </ul>
                    
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/carrito">
                                <FaShoppingCart className="me-1" /> Carrito
                                {totalCount > 0 && (
                                    <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle" style={{fontSize: '0.7rem'}}>
                                        {totalCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                                        <FaUser className="me-1" /> {user?.username}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {/*Solo mostrar adminitrar si es admin */}
                                        {isAdmin && (
                                        <>
                                            <li>
                                                <Link className="dropdown-item" to="/admin">
                                                    Administrar
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                        </>
                                        )}
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Cerrar Sesión
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="btn btn-outline-light me-2" to="/login">
                                        <FaUser className="me-1" /> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary" to="/registro">Registro</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
