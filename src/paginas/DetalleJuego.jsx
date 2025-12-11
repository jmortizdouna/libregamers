import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { FaArrowLeft, FaCartPlus, FaGamepad } from "react-icons/fa";

export default function DetalleJuego() {
    const { id } = useParams();
    const { agregar } = useCart();
    const { products, loading, error } = useProducts();
    const [juego, setJuego] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(true);

    useEffect(() => {
        if (id && products.length > 0) {
            const productoEncontrado = products.find(p => p.id === id);
            setJuego(productoEncontrado);
            setIsLoadingDetail(false);
        } else if (id && !loading) {
            // Si no está en los productos cargados, hacer fetch individual
            fetchJuegoIndividual();
        }
    }, [id, products, loading]);

    const fetchJuegoIndividual = async () => {
        try {
            setIsLoadingDetail(true);
            const response = await fetch(`https://68d6eeeac2a1754b426c458a.mockapi.io/api/productos/${id}`);
            if (!response.ok) throw new Error('Producto no encontrado');
            const data = await response.json();
            
            // Mapear datos para consistencia
            const juegoMapeado = {
                id: data.id,
                nombre: data.nombre || data.title || data.name,
                descripcion: data.descripcion || data.description || "Sin descripción disponible",
                precio: data.precio || data.price || 0,
                imagen: data.imagen || data.image || data.thumbnail || `https://picsum.photos/800/450?random=${id}`,
                detalles: data.detalles || data.detalle || "Información detallada no disponible"
            };
            
            setJuego(juegoMapeado);
        } catch (error) {
            console.error("Error cargando producto:", error);
        } finally {
            setIsLoadingDetail(false);
        }
    };

    const handleAgregarAlCarrito = () => {
        if (juego) {
            agregar(juego);
        }
    };

    if (isLoadingDetail || loading) {
        return (
            <div className="container my-5 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando detalles del juego...</p>
            </div>
        );
    }

    if (error || !juego) {
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-warning">
                    <h3>Juego no encontrado</h3>
                    <p className="mb-3">El juego que buscas no existe o ha sido removido.</p>
                    <Link to="/catalogo" className="btn btn-primary">
                        <FaArrowLeft className="me-2" />
                        Volver al catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <Helmet>
                <title>{juego.nombre} - LibreGamers</title>
                <meta name="description" content={juego.descripcion} />
            </Helmet>
            
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/catalogo">Catálogo</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {juego.nombre}
                    </li>
                </ol>
            </nav>

            <div className="row">
                {/* Imagen del producto */}
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="card border-0 shadow">
                        <img 
                            src={juego.imagen} 
                            alt={juego.nombre} 
                            className="img-fluid rounded"
                            style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
                        />
                    </div>
                </div>
                
                {/* Información del producto */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow h-100">
                        <div className="card-body">
                            <h1 className="h2 mb-3">
                                <FaGamepad className="text-primary me-2" />
                                {juego.nombre}
                            </h1>
                            
                            {/* Precio */}
                            <div className="mb-4">
                                <span className="display-5 text-success fw-bold">
                                    {juego.precio ? `$${Number(juego.precio).toFixed(2)}` : "Gratis"}
                                </span>
                                {juego.precio > 0 && (
                                    <small className="text-muted ms-2">(IVA incluido)</small>
                                )}
                            </div>
                            
                            {/* Descripción */}
                            <div className="mb-4">
                                <h3 className="h5 mb-3">Descripción</h3>
                                <p className="lead">{juego.descripcion}</p>
                                
                                {juego.detalles && juego.detalles !== "Información detallada no disponible" && (
                                    <>
                                        <h4 className="h5 mt-4 mb-3">Detalles adicionales</h4>
                                        <p>{juego.detalles}</p>
                                    </>
                                )}
                            </div>
                            
                            {/* Información adicional */}
                            <div className="mb-4">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="card bg-light">
                                            <div className="card-body text-center py-3">
                                                <small className="text-muted d-block">ID del Producto</small>
                                                <strong>{juego.id}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="card bg-light">
                                            <div className="card-body text-center py-3">
                                                <small className="text-muted d-block">Licencia</small>
                                                <strong>Software Libre</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Botones de acción */}
                            <div className="d-grid gap-3 mt-4">
                                <button 
                                    className="btn btn-success btn-lg py-3"
                                    onClick={handleAgregarAlCarrito}
                                >
                                    <FaCartPlus className="me-2" />
                                    Agregar al carrito
                                </button>
                                
                                <Link 
                                    to="/catalogo" 
                                    className="btn btn-outline-primary btn-lg py-3"
                                >
                                    <FaArrowLeft className="me-2" />
                                    Volver al catálogo
                                </Link>
                            </div>
                            
                            {/* Información adicional */}
                            <div className="alert alert-info mt-4">
                                <small>
                                    <strong>⚠️ Importante:</strong> Este es un juego de software libre. 
                                    Puedes estudiarlo, modificarlo y distribuirlo libremente según los términos de su licencia.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Sección de recomendaciones (opcional) */}
            <div className="row mt-5">
                <div className="col-12">
                    <h3 className="h4 mb-4">Otros juegos que te pueden interesar</h3>
                    <div className="alert alert-secondary">
                        <p className="mb-0">
                            Explora más juegos en nuestro <Link to="/catalogo">catálogo completo</Link> 
                            o regresa a la <Link to="/">página de inicio</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}