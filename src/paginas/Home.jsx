import React, {useEffect, useState} from "react";
import TarjetaJuego from "./TarjetaJuego";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {useProducts} from "../context/ProductsContext";
import { FaGamepad, FaSearch, FaDownload } from "react-icons/fa";

export default function Home() {
    const {products, loading, error} = useProducts();
    const [destacados, setDestacados] = useState([]);

    //Selecciona los primero 3 productos como destacados
    useEffect(() =>{
        if(products.length > 0) {
            // Toma los primeros 3 productos o menos si no hay 
            const primerosTres = products.slice(0, 3);
            setDestacados(primerosTres);
        }

    },[products]);

    if (loading) return <div className="container py-5 text-center">
        Cargando productos destacados...
    </div>;
    if (error) return <div className="container py-5">
        <div className="alert alert-danger">
            {error}
        </div>
    </div>;

    return(
        <div>
            <Helmet>
                <title>LibreGamers - Videojuegos de Software Libre</title>
                <meta name="description" content="Descubre y descarga videojuegos de software libre. Juegos open source, de calidad" />
                <meta name="keywords" content="videojuegos libres, open source, sotware libre" />
            </Helmet>
            {/* Hero */}
            <header className="bg-dark text-light text-center py-5">
                <div className="container">
                    <h1 className="display-4">Bienvenido a LibreGames</h1>
                    <p className="lead">Descubri y descarga videojuegos de software libre.</p>
                    <Link to="/catalogo" className="btn btn-primary btn-lg mt-3">Explorar Catalogo</Link>
                </div>
            </header>

            {/* Destacados */}
            <section className="container my-5">
                <h2 className="mb-4 text-center">Juegos destacados</h2>
                <div className="row">
                    {destacados.length > 0 ? (
                        destacados.map(g => (
                            <div key={g.id} className="col-12 col-md-4 mb-4">
                            <TarjetaJuego game={g}/>
                            </div>
                    ))
                ): (
                    <div className="col-12 text-center">
                        <p className="text-muted">
                            No hay juegos destacados disponibles.
                        </p>
                    </div>
                )}
                </div>
            </section>

            {/* Info corta */}
            <section className="bg-light py-4">
                <div className="container text-center">
                    <h3>¿Por que juegos libres?</h3>
                    <p className="mb-0">
                        El software libre permite estudiar, modificar y compartir los juegos. Apoyanos a desarrolladores comunitarios.
                    </p>
                </div>
            </section>
        </div>
    );
}