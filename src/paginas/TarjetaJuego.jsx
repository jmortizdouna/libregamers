import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaEye, FaCartPlus, FaGamepad } from "react-icons/fa";

export default function TarjetaJuego({ game }) {
    const { agregar } = useCart();

    const handleAgregar = () => {
        agregar(game);
        // El toast se muestra automáticamente desde el CartContext
    };

    return (
        <div className="card h-100">
            <img 
                src={game.imagen || game.image || `https://picsum.photos/400/200?random=${game.id}`} 
                className="card-img-top img-fluid" 
                alt={game.nombre || game.title || "juego"} 
                style={{ height: 180, objectFit: "cover" }} 
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title d-flex aling-items-ceter">
                    <FaGamepad className="text-primary me-2" />{game.nombre || game.title}</h5>
                <p className="card-text text-muted small flex-grow-1">
                    {game.descripcion || game.description || "Sin descripción"}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="fw-bold text-success h5 mb-0">
                        {(game.precio || game.price) 
                            ? `$${Number(game.precio || game.price).toFixed(2)}` 
                            : "Gratis"
                        }
                    </div>
                    <div className="d-flex gap-2">
                        <Link 
                            to={`/detalle/${game.id}`} 
                            className="btn btn-outline-primary btn-sm"
                            title="Ver detalles"
                        >
                            <FaEye />
                        </Link>
                        <button 
                            className="btn btn-sm btn-success" 
                            onClick={handleAgregar}
                            title="Agregar al carrito"
                            aria-label={`Agregar ${game.nombre} al carrito`}
                        >
                            <FaCartPlus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}