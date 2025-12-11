import React, { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts debe usarse dentro de un ProductsProvider');
    }
    return context;
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'https://68d6eeeac2a1754b426c458a.mockapi.io/api/productos';

    // Cargar productos desde MockAPI
    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al cargar productos');
            const data = await response.json();

            // Mapear datos para consistencia
            const mappedProducts = data.map(p => ({
                id: p.id,
                nombre: p.nombre || p.title || p.name,
                descripcion: p.descripcion || p.description,
                precio: p.precio || p.price,
                imagen: p.imagen || p.image || p.thumbail
            }));

            setProducts(mappedProducts);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error cargando productos:', err);
        } finally {
            setLoading(false);
        }
    };

    // Agregar producto
    const addProduct = async (product) => {
        try {
            const imagenPorDefecto = 'https://jmortizdouna.github.io/LibreGames/SinImagen.png';
            const productoParaEnviar = {
                nombre: product.nombre,
                precio: parseFloat(product.precio),
                descripcion: product.descripcion,
                imagen: product.imagen || imagenPorDefecto,
                title: product.nombre,
                description: product.descripcion,
                price: parseFloat(product.precio),
                thumbail: product.imagen || imagenPorDefecto
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoParaEnviar),
            });

            if (!response.ok) throw new Error('Error al agregar el producto');

            const newProduct = await response.json();
            
            // Actualizar estado local
            const productoMapeado = {
                id: newProduct.id,
                nombre: newProduct.nombre,
                descripcion: newProduct.descripcion,
                precio: newProduct.precio,
                imagen: newProduct.imagen
            };
            
            setProducts(prev => [...prev, productoMapeado]);
            return newProduct;
        } catch (err) {
            throw err;
        }
    };

    // Actualizar producto
    const updateProduct = async (id, updatedProduct) => {
        try {
            const imagenPorDefecto = 'https://jmortizdouna.github.io/LibreGames/SinImagen.png';
            const productoParaEnviar = {
                nombre: updatedProduct.nombre,
                precio: parseFloat(updatedProduct.precio),
                descripcion: updatedProduct.descripcion,
                imagen: updatedProduct.imagen || imagenPorDefecto,
                title: updatedProduct.nombre,
                description: updatedProduct.descripcion,
                price: parseFloat(updatedProduct.precio),
                thumbail: updatedProduct.imagen || imagenPorDefecto
            };

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoParaEnviar),
            });

            if (!response.ok) throw new Error('Error al actualizar producto');

            const product = await response.json();
            
            // Actualizar estado local
            const productoActualizado = {
                id: product.id,
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                imagen: product.imagen
            };
            
            setProducts(prev => prev.map(p => p.id === id ? productoActualizado : p));
            return product;
        } catch (err) {
            throw err;
        }
    };

    // Eliminar producto
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Error al eliminar producto');

            setProducts(prev => prev.filter(p => p.id !== id));
            return true;
        } catch (err) {
            throw err;
        }
    };

    // Cargar productos al iniciar
    useEffect(() => {
        loadProducts();
    }, []);

    const value = {
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProducts
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};