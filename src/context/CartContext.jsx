import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const CartContext = createContext();

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem("libregames_cart");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("libregames_cart", JSON.stringify(items));
    }, [items]);

    const totalCount = items.reduce((s, it) => s + (it.cantidad || 0), 0);

    function agregar(producto) {
        setItems(prev => {
            const existe = prev.find(p => p.id === producto.id);
            if (existe) {
                toast.success(`Cantidad de "${producto.nombre}" aumentada en el carrito`);
                return prev.map(p => 
                    p.id === producto.id 
                        ? { ...p, cantidad: (p.cantidad || 1) + 1 } 
                        : p
                );
            }

            const nuevo = {
                id: producto.id,
                nombre: producto.nombre || producto.title || producto.name,
                precio: Number(producto.precio || producto.price || 0),
                imagen: producto.imagen || producto.image || producto.thumbnail || "",
                cantidad: 1
            };
            
            toast.success(`"${producto.nombre}" agregado al carrito`);
            return [...prev, nuevo];
        });
    }

    function aumentar(id) {
        setItems(prev => prev.map(p => 
            p.id === id 
                ? { ...p, cantidad: p.cantidad + 1 } 
                : p
        ));
        toast.info("Producto actualizado en el carrito");
    }

    function disminuir(id) {
        setItems(prev => 
            prev.map(p => 
                p.id === id 
                    ? { ...p, cantidad: p.cantidad - 1 } 
                    : p
            ).filter(p => p.cantidad > 0)
        );
        toast.info("Producto actualizado en el carrito");
    }

    function quitar(id) {
        const producto = items.find(p => p.id === id);
        setItems(prev => prev.filter(p => p.id !== id));
        toast.warning(`"${producto?.nombre}" removido del carrito`);
    }

    function vaciar() {
        setItems([]);
        toast.info("Carrito vaciado");
    }

    const value = {
        items,
        agregar,
        aumentar,
        disminuir,
        quitar,
        vaciar,
        totalCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}