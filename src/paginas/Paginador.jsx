import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Paginador({ 
    paginaActual, 
    totalPaginas, 
    cambiarPagina,
    className = '' 
}) {
    
    const generarBotonesPaginas = () => {
        const botones = [];
        const maxBotones = 5;
        
        let inicio = Math.max(1, paginaActual - Math.floor(maxBotones / 2));
        let fin = Math.min(totalPaginas, inicio + maxBotones - 1);
        
        // Ajustar si estamos cerca del final
        inicio = Math.max(1, fin - maxBotones + 1);
        
        for (let i = inicio; i <= fin; i++) {
            botones.push(
                <button
                    key={i}
                    className={`btn ${paginaActual === i ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                    onClick={() => cambiarPagina(i)}
                    aria-label={`Página ${i}`}
                    aria-current={paginaActual === i ? "page" : undefined}
                >
                    {i}
                </button>
            );
        }
        
        return botones;
    };

    if (totalPaginas <= 1) return null;

    return (
        <div className={`paginador ${className}`}>
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                    disabled={paginaActual === 1}
                    aria-label="Página anterior"
                >
                    <FaChevronLeft />
                </button>
                
                {generarBotonesPaginas()}
                
                <button
                    className="btn btn-outline-primary"
                    onClick={() => cambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                    disabled={paginaActual === totalPaginas}
                    aria-label="Página siguiente"
                >
                    <FaChevronRight />
                </button>
            </div>
            
            <div className="text-center mt-2 text-muted small">
                Página {paginaActual} de {totalPaginas}
            </div>
        </div>
    );
}