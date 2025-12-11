import React from "react";
import { Helmet } from "react-helmet-async";

export default function SobreNosotros() {
    return (
        <div className="container my-5">
            <Helmet>
                <title>Sobre Nosotros - LibreGamers</title>
                <meta name="description" content="Conoce mas sobre LibreGamers, nuestra mision y vision en la promocion de videojuegos de software libre."/>
            </Helmet>
            <h2 className="text-center mb-4">Sobre nosotros</h2>

            <p>
                LibreGames es una plataforma dedicada a compartir y difundir videojuegos de software libre.
                Nuestro objetivo es apoyara a desarrolladores independientes y ofrecer títulos que cualquiera pueda estudiar, modificar y distribuir.
            </p>

            <p> 
                Eeste proyecto es una demostración para el trabajo final de React: implementa rutas, componentes reutilizables, y más.
            </p>

        </div>
    );
}