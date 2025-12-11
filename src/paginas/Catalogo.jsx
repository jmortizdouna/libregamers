import React, { useState, useEffect } from "react";
import TarjetaJuego from "./TarjetaJuego";
import { useProducts } from "../context/ProductsContext";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaChevronLeft, FaChevronRight, FaStepBackward, FaStepForward } from "react-icons/fa";
import {useDebounce } from 'use-debounce';

export default function Catalogo() {
    const { products, loading, error } = useProducts();
    const [busqueda, setBusqueda] = useState("");
    const [debouncedBusqueda] = useDebounce(busqueda, 300);
    const [paginaActual, setPaginaActual] = useState(1);
    const [productosPorPagina] = useState(8); // Mostrar 8 productos por página

    // Filtrar productos según la búsqueda
    const productosFiltrados = products.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Calcular índices para paginación
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    // Cambiar de página
    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
        // Scroll suave hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Ir a página anterior
    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Ir a página siguiente
    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Resetear a página 1 cuando cambia la búsqueda
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    if (loading) return <div className="container py-5 text-center">Cargando productos...</div>;
    if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container my-4">
            <Helmet>
                <title>Catálogo de Juegos - LibreGames</title>
                <meta name="description" content="Explora nuestro catálogo completo de videojuegos libres. Encuentra tu próximo juego favorito." />
            </Helmet>
            
            <h1 className="mb-4 text-center">Catálogo de Juegos</h1>

            {/* Barra de búsqueda */}
            <div className="row mb-4">
                <div className="col-12 col-md-8 col-lg-6 mx-auto">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar juegos por nombre o descripción..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            aria-label="Buscar juegos"
                        />
                    </div>
                </div>
            </div>

            {/* Resultados de búsqueda y paginación info */}
            <div className="row mb-3">
                <div className="col-12 col-md-6">
                    {busqueda && (
                        <p className="text-muted">
                            {productosFiltrados.length > 0 
                                ? `Se encontraron ${productosFiltrados.length} juego(s) para "${busqueda}"`
                                : `No se encontraron juegos para "${busqueda}"`
                            }
                        </p>
                    )}
                </div>
                <div className="col-12 col-md-6 text-md-end">
                    {productosFiltrados.length > 0 && (
                        <p className="text-muted">
                            Página {paginaActual} de {totalPaginas} 
                            ({productosFiltrados.length} juegos totales)
                        </p>
                    )}
                </div>
            </div>

            {/* Grid de productos */}
            <div className="row g-4">
                {productosActuales.length > 0 ? (
                    productosActuales.map(p => (
                        <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <TarjetaJuego game={p} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <div className="alert alert-info">
                            <h5>No hay juegos disponibles</h5>
                            <p className="mb-0">Intenta con otros términos de búsqueda o revisa más tarde.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Paginador */}
            {totalPaginas > 1 && (
                <nav aria-label="Paginación de juegos" className="mt-5">
                    <ul className="pagination justify-content-center flex-wrap">
                        {/* Botón Primera Página */}
                        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => cambiarPagina(1)}
                                aria-label="Primera página"
                                disabled={paginaActual === 1}
                            >
                                <FaStepBackward />
                            </button>
                        </li>
                        
                        {/* Botón Página Anterior */}
                        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={paginaAnterior}
                                aria-label="Página anterior"
                                disabled={paginaActual === 1}
                            >
                                <FaChevronLeft />
                            </button>
                        </li>
                        
                        {/* Botones de páginas numéricas */}
                        {(() => {
                            const paginas = [];
                            const maxPaginasVisibles = 5;
                            let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
                            let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);
                            
                            // Ajustar inicio si estamos cerca del final
                            inicio = Math.max(1, fin - maxPaginasVisibles + 1);
                            
                            for (let i = inicio; i <= fin; i++) {
                                paginas.push(
                                    <li key={i} className={`page-item ${paginaActual === i ? 'active' : ''}`}>
                                        <button 
                                            className="page-link" 
                                            onClick={() => cambiarPagina(i)}
                                            aria-label={`Página ${i}`}
                                            aria-current={paginaActual === i ? "page" : undefined}
                                        >
                                            {i}
                                        </button>
                                    </li>
                                );
                            }
                            return paginas;
                        })()}
                        
                        {/* Botón Página Siguiente */}
                        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={paginaSiguiente}
                                aria-label="Página siguiente"
                                disabled={paginaActual === totalPaginas}
                            >
                                <FaChevronRight />
                            </button>
                        </li>
                        
                        {/* Botón Última Página */}
                        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => cambiarPagina(totalPaginas)}
                                aria-label="Última página"
                                disabled={paginaActual === totalPaginas}
                            >
                                <FaStepForward />
                            </button>
                        </li>
                    </ul>
                    
                    
                </nav>
            )}
        </div>
    );
}